// LAST WORKING CODE
// import * as Location from "expo-location";
// import { useState, useEffect } from "react";
// import { View, Text } from "react-native";

// export default function LocationScreen() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Location permission denied");
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc);
//     })();
//   }, []);

//   return (
//     <View>
//       <Text>Your Location:</Text>
//       <Text>{JSON.stringify(location)}</Text>
//       {errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : null}
//     </View>
//   );
// }
// ==================================================================
// LocationScreen (or wherever you want to save)
// import * as Location from "expo-location";
// import { supabase } from "../../supabaseClient";
// import * as Location from "expo-location";

// async function saveLocationToSupabase() {
//   const { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== "granted") return;

//   const loc = await Location.getCurrentPositionAsync({});
//   const { latitude, longitude } = loc.coords;

//   // get auth user id
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) return;

//   await supabase
//     .from("profiles")
//     .update({
//       lat: latitude,
//       lng: longitude,
//       last_location_at: new Date().toISOString(),
//     })
//     .eq("id", user.id);
// }
// ==================================================================
// MOST RECENT WORKING CODE
// src/screens/LocationScreen.js
// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import * as Location from "expo-location";
// import { supabase } from "../../supabaseClient"; // 👈 correct path from /src/screens

// export default function LocationScreen() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Get location and save it to Supabase
//   const getAndSaveLocation = async () => {
//     try {
//       setErrorMsg("");

//       // 1) Ask for permission
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied.");
//         return;
//       }

//       // 2) Get current position
//       const loc = await Location.getCurrentPositionAsync({}); // this is the current location
//       setLocation(loc);

//       const { latitude, longitude } = loc.coords; // pulls out just the latitude and longitude from loc
//       // will extract the datetime as well later

//       // 3) Get current user from Supabase auth
//       // access data.user to get user info that would be the whole {user: {id: "uuid...", email: ... "}} the whole object
//       const {
//         data: { user }, // {user: { id: "uuid...", email: "x@y.com", ... }} is the format that data is stored as
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) throw userError;
//       if (!user) {
//         throw new Error("No logged-in user.");
//       }

//       // 4) Save lat/lng to profiles table
//       // what does await do? A) it waits for the update to finish, if there is an error it is stored in error
//       const { error } = await supabase
//         .from("profiles")
//         .update({
//           lat: latitude, // is lat the name of the column in supabase?
//           lng: longitude,
//         })
//         .eq("id", user.id);

//       if (error) throw error;

//       console.log("Location saved to Supabase:", { latitude, longitude });
//     } catch (err) {
//       console.log("LocationScreen error:", err);
//       setErrorMsg(err.message ?? "Something went wrong getting location.");
//     }
//   };

//   // Run once when screen mounts
//   useEffect(() => {
//     getAndSaveLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>LocationScreen</Text>

//       <Text style={styles.label}>Your Location:</Text>
//       <Text style={styles.locationText}>
//         {location ? JSON.stringify(location.coords, null, 2) : "Loading..."}
//       </Text>

//       {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

//       {/* Manual refresh button */}
//       <Button title="Refresh Location" onPress={getAndSaveLocation} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   locationText: {
//     fontFamily: "monospace",
//     fontSize: 12,
//     marginBottom: 12,
//   },
//   error: {
//     color: "red",
//     marginBottom: 12,
//   },
// });
// ==================================================================
// MOST RECENT CODE WITH MATCH FINDING
// src/screens/LocationScreen.js
// For testing adding match data for this screen
// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import * as Location from "expo-location";
// import { supabase } from "../../supabaseClient"; // 👈 correct path from /src/screens

// export default function LocationScreen() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [matches, setMatches] = useState([]); // This goes to the matches page

//   // Get location and save it to Supabase
//   const getAndSaveLocation = async () => {
//     try {
//       setErrorMsg("");

//       // 1) Ask for permission
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied.");
//         return;
//       }

//       // 2) Get current position
//       const loc = await Location.getCurrentPositionAsync({}); // this is the current location
//       setLocation(loc);

//       const { latitude, longitude } = loc.coords; // pulls out just the latitude and longitude from loc
//       // will extract the datetime as well later

//       // 3) Get current user from Supabase auth
//       // access data.user to get user info that would be the whole {user: {id: "uuid...", email: ... "}} the whole object
//       const {
//         data: { user }, // {user: { id: "uuid...", email: "x@y.com", ... }} is the format that data is stored as
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) throw userError;
//       if (!user) {
//         throw new Error("No logged-in user.");
//       }

//       // 4) Save lat/lng to profiles table
//       // what does await do? A) it waits for the update to finish, if there is an error it is stored in error
//       const { error } = await supabase
//         .from("profiles")
//         .update({
//           lat: latitude, // is lat the name of the column in supabase?
//           lng: longitude,
//         })
//         .eq("id", user.id);

//       if (error) throw error;

//       console.log("Location saved to Supabase:", { latitude, longitude });
//     } catch (err) {
//       console.log("LocationScreen error:", err);
//       setErrorMsg(err.message ?? "Something went wrong getting location.");
//     }
//   };

//   // This function is for the matches page when I transfer this function over to that screen
//   const findMatches = async () => {
//     setErrorMsg("");
//     try {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("No logged-in user.");

//       const radiusKm = 10;

//       const { data, error } = await supabase.rpc("find_matches", {
//         p_user_id: user.id,
//         p_radius_km: radiusKm,
//       });

//       if (error) throw error;

//       console.log("MATCH RESULTS:", data);
//       setMatches(data ?? []);
//     } catch (e) {
//       setErrorMsg(e.message ?? "Failed to find matches.");
//     }
//   };

//   // Run once when screen mounts
//   useEffect(() => {
//     getAndSaveLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>LocationScreen</Text>

//       <Text style={styles.label}>Your Location:</Text>
//       <Text style={styles.locationText}>
//         {location ? JSON.stringify(location.coords, null, 2) : "Loading..."}
//       </Text>

//       {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

//       {/* Manual refresh button */}
//       <Button title="Refresh Location" onPress={getAndSaveLocation} />

//       {/* Below this is the Find matches stuff */}
//       <Button title="Find Matches" onPress={findMatches} />

//       {matches.length === 0 ? (
//         <Text>No matches yet.</Text>
//       ) : (
//         matches.map((m) => (
//           <View key={m.other_user_id} style={{ marginTop: 10 }}>
//             <Text>{m.other_user_id}</Text>
//             <Text>{m.distance_km.toFixed(2)} km away</Text>
//             <Text>{m.shared_interests} shared</Text>
//             <Text>avg diff: {m.avg_score_diff.toFixed(2)}</Text>
//           </View>
//         ))
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   locationText: {
//     fontFamily: "monospace",
//     fontSize: 12,
//     marginBottom: 12,
//   },
//   error: {
//     color: "red",
//     marginBottom: 12,
//   },
// });
// ==================================================================
// most recent working code
// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import * as Location from "expo-location";
// import { supabase } from "../../supabaseClient"; // 👈 correct path from /src/screens
// import { createMatchArtifact } from "../services/user";

// // Q: Why add the { navigation }, what does it do? what variable type is it?
// export default function LocationScreen({ navigation }) {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [matches, setMatches] = useState([]); // This goes to the matches page

//   // Get location and save it to Supabase
//   const getAndSaveLocation = async () => {
//     try {
//       setErrorMsg("");

//       // 1) Ask for permission
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied.");
//         return;
//       }

//       // 2) Get current position
//       const loc = await Location.getCurrentPositionAsync({}); // this is the current location
//       setLocation(loc);

//       const { latitude, longitude } = loc.coords; // pulls out just the latitude and longitude from loc
//       // will extract the datetime as well later

//       // 3) Get current user from Supabase auth
//       // access data.user to get user info that would be the whole {user: {id: "uuid...", email: ... "}} the whole object
//       const {
//         data: { user }, // {user: { id: "uuid...", email: "x@y.com", ... }} is the format that data is stored as
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) throw userError;
//       if (!user) {
//         throw new Error("No logged-in user.");
//       }

//       // 4) Save lat/lng to profiles table
//       // what does await do? A) it waits for the update to finish, if there is an error it is stored in error
//       const { error } = await supabase
//         .from("profiles")
//         .update({
//           lat: latitude, // is lat the name of the column in supabase?
//           lng: longitude,
//         })
//         .eq("id", user.id);

//       if (error) throw error;

//       console.log("Location saved to Supabase:", { latitude, longitude });
//     } catch (err) {
//       console.log("LocationScreen error:", err);
//       setErrorMsg(err.message ?? "Something went wrong getting location.");
//     }
//   };

//   // This function is for the matches page when I transfer this function over to that screen
//   const findMatches = async () => {
//     setErrorMsg("");
//     try {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("No logged-in user.");

//       const radiusKm = 10;

//       const { data, error } = await supabase.rpc("find_matches", {
//         p_user_id: user.id,
//         p_radius_km: radiusKm,
//       });

//       if (error) throw error;

//       console.log("MATCH RESULTS:", data);
//       setMatches(data ?? []);
//     } catch (e) {
//       setErrorMsg(e.message ?? "Failed to find matches.");
//     }
//   };

//   // Run once when screen mounts
//   useEffect(() => {
//     getAndSaveLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* deletable code */}
//       <Text style={styles.title}>LocationScreen</Text>

//       <Text style={styles.label}>Your Location:</Text>
//       <Text style={styles.locationText}>
//         {location ? JSON.stringify(location.coords, null, 2) : "Loading..."}
//       </Text>

//       {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

//       {/* Manual refresh button */}
//       <Button title="Refresh Location" onPress={getAndSaveLocation} />

//       {/* Below this is the Find matches stuff */}
//       <Button title="Find Matches" onPress={findMatches} />

//       {matches.length === 0 ? (
//         <Text>No matches yet.</Text>
//       ) : (
//         matches.map((m) => (
//           <View key={m.other_user_id} style={{ marginTop: 10 }}>
//             <Text>{m.other_user_id}</Text>
//             <Text>{m.distance_km.toFixed(2)} km away</Text>
//             <Text>{m.shared_interests} shared</Text>
//             <Text>avg diff: {m.avg_score_diff.toFixed(2)}</Text>
//           </View>
//         ))
//       )}

//       {/* NEW CODE */}
//       {matches.length === 0 ? (
//         <Text>No matches yet.</Text>
//       ) : (
//         matches.map((m) => (
//           <View key={m.other_user_id} style={{ marginTop: 10 }}>
//             <Text>{m.other_user_id}</Text>
//             <Text>{m.distance_km.toFixed(2)} km away</Text>
//             <Text>{m.shared_interests} shared</Text>
//             <Text>avg diff: {m.avg_score_diff.toFixed(2)}</Text>

//             <Button
//               title="Reveal Match"
//               onPress={async () => {
//                 try {
//                   const artifact = await createMatchArtifact(m.other_user_id);
//                   navigation.navigate("MatchReveal", {
//                     code: artifact.code,
//                     wallpaper_key: artifact.wallpaper_key,
//                   });
//                 } catch (e) {
//                   setErrorMsg(e.message ?? "Failed to create match reveal.");
//                 }
//               }}
//             />
//           </View>
//         ))
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   locationText: {
//     fontFamily: "monospace",
//     fontSize: 12,
//     marginBottom: 12,
//   },
//   error: {
//     color: "red",
//     marginBottom: 12,
//   },
// });
// ==================================================================
// MOST RECENT WORKING CODE
// import React, { useEffect, useState } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import * as Location from "expo-location";
// import { supabase } from "../../supabaseClient";
// import { createMatchArtifact } from "../services/user";

// export default function LocationScreen({ navigation }) {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [matches, setMatches] = useState([]);

//   const getAndSaveLocation = async () => {
//     try {
//       setErrorMsg("");

//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied.");
//         return;
//       }

//       const loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc);

//       const { latitude, longitude } = loc.coords;

//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) throw userError;
//       if (!user) throw new Error("No logged-in user.");

//       const { error } = await supabase
//         .from("profiles")
//         .update({
//           lat: latitude,
//           lng: longitude,
//           // location_updated_at: new Date().toISOString(), //this was added after it already worked
//         })
//         .eq("id", user.id);

//       if (error) throw error;

//       console.log("Location saved to Supabase:", { latitude, longitude });
//     } catch (err) {
//       console.log("LocationScreen error:", err);
//       setErrorMsg(err.message ?? "Something went wrong getting location.");
//     }
//   };

//   const findMatches = async () => {
//     setErrorMsg("");
//     try {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       if (!user) throw new Error("No logged-in user.");

//       const radiusKm = 10;

//       const { data, error } = await supabase.rpc("find_matches", {
//         p_user_id: user.id,
//         p_radius_km: radiusKm,
//       });

//       if (error) throw error;

//       console.log("MATCH RESULTS:", data);
//       setMatches(data ?? []);
//     } catch (e) {
//       setErrorMsg(e.message ?? "Failed to find matches.");
//     }
//   };

//   useEffect(() => {
//     getAndSaveLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>LocationScreen</Text>

//       <Text style={styles.label}>Your Location:</Text>
//       <Text style={styles.locationText}>
//         {location ? JSON.stringify(location.coords, null, 2) : "Loading..."}
//       </Text>

//       {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

//       <Button title="Refresh Location" onPress={getAndSaveLocation} />
//       <Button title="Find Matches" onPress={findMatches} />

//       {matches.length === 0 ? (
//         <Text style={{ marginTop: 10 }}>No matches yet.</Text>
//       ) : (
//         matches.map((m) => (
//           <View key={m.other_user_id} style={{ marginTop: 12 }}>
//             <Text>{m.other_user_id}</Text>
//             <Text>{Number(m.distance_km).toFixed(2)} km away</Text>
//             <Text>{m.shared_interests} shared</Text>
//             <Text>avg diff: {Number(m.avg_score_diff).toFixed(2)}</Text>

//             <Button
//               title="Reveal Match"
//               onPress={async () => {
//                 try {
//                   const artifact = await createMatchArtifact(m.other_user_id);
//                   navigation.navigate("MatchReveal", {
//                     code: artifact.code,
//                     wallpaper_key: artifact.wallpaper_key,
//                   });
//                 } catch (e) {
//                   setErrorMsg(e.message ?? "Failed to create match reveal.");
//                 }
//               }}
//             />
//           </View>
//         ))
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16 },
//   title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
//   label: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
//   locationText: { fontFamily: "monospace", fontSize: 12, marginBottom: 12 },
//   error: { color: "red", marginBottom: 12 },
// });
// ==================================================================
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { supabase } from "../../supabaseClient";
import { createMatchArtifact } from "../services/user";

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [matches, setMatches] = useState([]);

  const [isSavingLocation, setIsSavingLocation] = useState(false);
  const [isFindingMatches, setIsFindingMatches] = useState(false);

  const coords = location?.coords ?? null;

  const prettyCoords = useMemo(() => {
    if (!coords) return null;
    return {
      lat: Number(coords.latitude).toFixed(5),
      lng: Number(coords.longitude).toFixed(5),
      accuracy: coords.accuracy ? `${Math.round(coords.accuracy)}m` : "—",
    };
  }, [coords]);

  const getAndSaveLocation = async () => {
    try {
      setErrorMsg("");
      setIsSavingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(loc);

      const { latitude, longitude } = loc.coords;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("No logged-in user.");

      const { error } = await supabase
        .from("profiles")
        .update({
          lat: latitude,
          lng: longitude,
          // location_updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      console.log("Location saved to Supabase:", { latitude, longitude });
    } catch (err) {
      console.log("LocationScreen error:", err);
      setErrorMsg(err?.message ?? "Something went wrong getting location.");
    } finally {
      setIsSavingLocation(false);
    }
  };

  const findMatches = async () => {
    setErrorMsg("");
    setIsFindingMatches(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("No logged-in user.");

      const radiusKm = 10;

      const { data, error } = await supabase.rpc("find_matches", {
        p_user_id: user.id,
        p_radius_km: radiusKm,
      });

      if (error) throw error;

      console.log("MATCH RESULTS:", data);
      setMatches(data ?? []);
    } catch (e) {
      setErrorMsg(e?.message ?? "Failed to find matches.");
    } finally {
      setIsFindingMatches(false);
    }
  };

  useEffect(() => {
    getAndSaveLocation();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Matches</Text>
        <Text style={styles.subtitle}>
          Update your location, then find people with shared interests.
        </Text>
      </View>

      {/* Error */}
      {errorMsg ? (
        <View style={styles.alert}>
          <Text style={styles.alertTitle}>Something went wrong</Text>
          <Text style={styles.alertText}>{errorMsg}</Text>
        </View>
      ) : null}

      {/* Location Card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Your location</Text>
          {isSavingLocation ? (
            <View style={styles.inlineRow}>
              <ActivityIndicator />
              <Text style={styles.muted}> Saving…</Text>
            </View>
          ) : (
            <Text style={styles.muted}>Ready</Text>
          )}
        </View>

        {!prettyCoords ? (
          <Text style={styles.muted}>Getting your coordinates…</Text>
        ) : (
          <View style={{ marginTop: 8 }}>
            <Row label="Latitude" value={prettyCoords.lat} />
            <Row label="Longitude" value={prettyCoords.lng} />
            <Row label="Accuracy" value={prettyCoords.accuracy} />
          </View>
        )}

        <View style={styles.buttonRow}>
          <PrimaryButton
            title={isSavingLocation ? "Refreshing…" : "Refresh location"}
            onPress={getAndSaveLocation}
            disabled={isSavingLocation}
          />
          <SecondaryButton
            title={isFindingMatches ? "Finding…" : "Find matches"}
            onPress={findMatches}
            disabled={isFindingMatches || !coords}
          />
        </View>

        {!coords ? (
          <Text style={[styles.muted, { marginTop: 10 }]}>
            Tip: enable location permissions to find matches.
          </Text>
        ) : null}
      </View>

      {/* Matches */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Results</Text>
        <Text style={styles.sectionMeta}>
          {matches?.length ? `${matches.length} found` : "None yet"}
        </Text>
      </View>

      {matches.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>No matches yet</Text>
          <Text style={styles.muted}>
            Try refreshing your location or increasing your radius in the RPC.
          </Text>
        </View>
      ) : (
        matches.map((m) => (
          <View key={m.other_user_id} style={styles.matchCard}>
            <View style={styles.matchTopRow}>
              <Text style={styles.matchTitle}>Potential Match</Text>
              <Text style={styles.matchPill}>
                {Number(m.distance_km).toFixed(1)} km
              </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <Row label="Shared interests" value={`${m.shared_interests}`} />
              <Row
                label="Avg score diff"
                value={Number(m.avg_score_diff).toFixed(2)}
              />
            </View>

            {/* Keep id, but make it secondary (or remove once you show username) */}
            <Text style={[styles.muted, { marginTop: 10 }]}>
              id: {m.other_user_id}
            </Text>

            <View style={{ marginTop: 12 }}>
              <PrimaryButton
                title="Reveal match"
                onPress={async () => {
                  try {
                    const artifact = await createMatchArtifact(m.other_user_id);
                    navigation.navigate("MatchReveal", {
                      code: artifact.code,
                      wallpaper_key: artifact.wallpaper_key,
                    });
                  } catch (e) {
                    setErrorMsg(e?.message ?? "Failed to create match reveal.");
                  }
                }}
              />
            </View>
          </View>
        ))
      )}

      <Text style={styles.footerSpace} />
    </ScrollView>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function PrimaryButton({ title, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryBtn,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
      ]}
    >
      <Text style={styles.primaryBtnText}>{title}</Text>
    </Pressable>
  );
}

function SecondaryButton({ title, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.secondaryBtn,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
      ]}
    >
      <Text style={styles.secondaryBtnText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 28,
  },

  header: {
    marginTop: 6,
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#555",
    lineHeight: 19,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    }),
  },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  muted: { color: "#666", fontSize: 13 },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  secondaryBtnText: {
    color: "#111",
    fontWeight: "700",
    fontSize: 14,
  },

  btnDisabled: { opacity: 0.55 },
  btnPressed: { transform: [{ scale: 0.99 }] },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  rowLabel: {
    width: 110,
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },
  rowValue: {
    flex: 1,
    fontSize: 13,
    color: "#111",
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
  },

  sectionHeader: {
    marginTop: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  sectionMeta: {
    fontSize: 13,
    color: "#666",
  },

  matchCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    }),
  },
  matchTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  matchPill: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111",
    backgroundColor: "#78bbe7ff", // "#f2f2f2"
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  emptyCard: {
    backgroundColor: "#fafafa",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },

  alert: {
    backgroundColor: "#fff3f3",
    borderWidth: 1,
    borderColor: "#ffd1d1",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  alertTitle: { fontWeight: "800", marginBottom: 4, color: "#8a1f1f" },
  alertText: { color: "#8a1f1f" },

  footerSpace: { height: 10 },
});
