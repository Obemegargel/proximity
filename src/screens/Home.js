// // Most recent code that worked
// import {
//   ActivityIndicator,
//   FlatList,
//   SafeAreaViewBase,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React, { useEffect } from "react";
// import { fetchUsers } from "../services/user";

// const Home = () => {
//   // keep 3 states here
//   const [users, setUsers] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState(null);

//   const getAllUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchUsers();

//       // update user state
//       setUsers(res);
//       console.log("res", JSON.stringify(res, null, 2));
//     } catch (error) {
//       console.log("error", error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   // Add guard clauses

//   if (loading) {
//     return <ActivityIndicator color={"red"} size={"large"} />;
//   }

//   if (error) {
//     return <Text style={{ color: "red" }}>{error}</Text>;
//   }
//   return (
//     <View>
//       <Text style={{ fontSize: 42, color: "green" }}>Home</Text>

//       <FlatList
//         data={users}
//         renderItem={({ item }) => {
//           return (
//             <View>
//               <Text style={{ fontSize: 18, color: "blue" }}>
//                 {item.user_id} {item.username}
//               </Text>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({});
// ==============================================================
// //-------------------
// screens/Home.js
// screens/Home.tsx
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <Text>Home (TSX)</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", justifyContent: "center" },
// });
// ==============================================================
// most recent to kind of work
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { fetchUsers } from "../services/user";

// const Home = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const getAllUsers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetchUsers();

//       // res should be an array (e.g. from supabase.from("profiles").select())
//       setUsers(res || []);
//       console.log("res", JSON.stringify(res, null, 2));
//     } catch (err) {
//       console.log("error in getAllUsers:", err);
//       setError(err.message || "Something went wrong fetching users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllUsers();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator color="red" size="large" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "red" }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Home</Text>

//       <FlatList
//         data={users}
//         keyExtractor={(item, index) => item.id?.toString() ?? String(index)}
//         renderItem={({ item }) => (
//           <View style={styles.userRow}>
//             <Text style={styles.userText}>
//               {/* adjust these fields to match what fetchUsers returns */}
//               {item.user_id ?? item.id} {item.username}
//             </Text>
//           </View>
//         )}
//         ListEmptyComponent={
//           <Text style={{ marginTop: 16 }}>No users found.</Text>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 32,
//     color: "green",
//     marginBottom: 16,
//   },
//   userRow: {
//     paddingVertical: 4,
//   },
//   userText: {
//     fontSize: 18,
//     color: "blue",
//   },
// });
// ==============================================================
// most recent working version with search feature
// import React, { useEffect, useState, useMemo } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { getCurrentUserProfile, fetchInterests } from "../services/user";

// const Home = () => {
//   const [username, setUsername] = useState("");
//   const [interests, setInterests] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       // 1) Get logged-in user's username
//       const profile = await getCurrentUserProfile();
//       setUsername(profile.username || "");

//       // 2) Get all interests
//       const allInterests = await fetchInterests();
//       setInterests(allInterests);
//       console.log("allInterests from Supabase:", allInterests); // for debugging
//     } catch (err) {
//       console.log("Home load error:", err);
//       setError(err.message || "Something went wrong loading data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   // Filter interests based on search text
//   const filteredInterests = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return interests;

//     // startsWith search (e.g., "sk" matches "skiing")
//     // return interests.filter((item) => item.name.toLowerCase().startsWith(q));
//     return interests.filter((item) => item.name.toLowerCase().includes(q));
//   }, [search, interests]);

//   console.log("search:", search); //for debugging
//   console.log("filteredInterests:", filteredInterests); //for debugging
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "red" }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Username at top */}
//       <Text style={styles.usernameText}>{username || "username"}</Text>

//       {/* Search Interests section */}
//       <View style={styles.searchSection}>
//         <Text style={styles.sectionTitle}>Search Interests</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="type search..."
//           value={search}
//           onChangeText={setSearch}
//         />

//         <View style={styles.searchResultsBox}>
//           <FlatList
//             data={filteredInterests}
//             keyExtractor={(item) => item.interest_id?.toString() ?? item.name}
//             renderItem={({ item }) => (
//               <View style={styles.interestRow}>
//                 <Text style={styles.interestText}>{item.name}</Text>
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text style={{ padding: 8 }}>No matching interests.</Text>
//             }
//           />
//         </View>
//       </View>

//       {/* Green button that does nothing for now */}
//       <View style={styles.buttonPlaceholder}>
//         <Text style={styles.buttonText}>
//           Search for people with similar interests
//         </Text>
//       </View>

//       {/* Interests list (we'll fill this later) */}
//       <Text style={styles.sectionTitle}>Interests</Text>
//       {/* placeholder until you hook it up */}
//       <Text>(interests list will go here later)</Text>
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#ddd", // roughly like your mockup
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   usernameText: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//     textDecorationLine: "underline",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textDecorationLine: "underline",
//     marginBottom: 8,
//   },
//   searchSection: {
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: "white",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   searchResultsBox: {
//     backgroundColor: "white",
//     borderRadius: 4,
//     maxHeight: 200,
//   },
//   interestRow: {
//     paddingVertical: 6,
//     paddingHorizontal: 8,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#ccc",
//   },
//   interestText: {
//     fontSize: 16,
//   },
//   buttonPlaceholder: {
//     marginVertical: 16,
//     padding: 12,
//     backgroundColor: "lightgreen",
//     borderWidth: 1,
//     borderColor: "green",
//     alignItems: "center",
//     borderRadius: 4,
//   },
//   buttonText: {
//     fontWeight: "600",
//   },
// });
// ==============================================================
// most recent working version
// import React, { useEffect, useState, useMemo, use } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Pressable, // I added this, then error
//   Alert, // I added this, then error
// } from "react-native";
// import {
//   getCurrentUserProfile,
//   fetchInterests,
//   fetchUserInterestScores,
//   findNearbyMatches,
// } from "../services/user";
// import { useFocusEffect } from "@react-navigation/native";

// // why does the { navigation } work here but not in previous versions? my guess because navigation is for the interest inside this whole thing
// const Home = ({ navigation }) => {
//   const [username, setUsername] = useState("");
//   const [interests, setInterests] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   // const [fetchUserInterestScores, setUserInterests] = useState([]);
//   const [userInterests, setUserInterests] = useState([]); // hopefull this is in the right spot. it is for fetching user's interests

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       // 1) Get logged-in user's username
//       const profile = await getCurrentUserProfile();
//       setUsername(profile.username || "");

//       // 2) Get all interests
//       const allInterests = await fetchInterests();
//       setInterests(allInterests);
//       console.log("allInterests from Supabase:", allInterests); // for debugging

//       // 3) Get user's interest scores
//       const scores = await fetchUserInterestScores();

//       // Build a lookup map from interest_id -> interest object
//       const interestById = {};
//       for (const interest of allInterests) {
//         interestById[interest.interest_id] = interest;
//       }

//       // 4) Combine into "userInterests" with name + score
//       const combined = scores
//         .map((s) => {
//           const interest = interestById[s.is_interest_id];
//           if (!interest) return null;
//           return {
//             ...interest,
//             score: s.score,
//           };
//         })
//         .filter(Boolean);

//       setUserInterests(combined);
//     } catch (err) {
//       console.log("Home load error:", err);
//       setError(err.message || "Something went wrong loading data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // handle Finding Matches function
//   const handleFindMatches = async () => {
//     try {
//       const matches = await findNearbyMatches(10); //search within 10 km
//       console.log("MATCH RESULTS:", matches);
//       // Navigate to a screen to show them (optional)
//       // For now, navigate to LocationScreen (this route already exists)
//       navigation.navigate("LocationScreen", { matches });
//       // Later, when you create MatchesScreen and add it to the navigator:
//       // navigation.navigate("MatchesScreen", { matches });
//     } catch (err) {
//       console.log("Error finding matches:", err);
//       Alert.alert("Error", error.message);
//     }
//     // navigation.navigate("LocationScreen"); // tested handleFindMatches just navigates to LocationScreen
//   };

//   // useEffect(() => {
//   //   loadData();
//   // }, []);
//   useFocusEffect(
//     React.useCallback(() => {
//       // This runs every time the Home screen comes into focus
//       loadData();
//     }, [])
//   );

//   // Filter interests based on search text
//   const filteredInterests = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     if (!q) return interests;

//     // startsWith search (e.g., "sk" matches "skiing")
//     // return interests.filter((item) => item.name.toLowerCase().startsWith(q));
//     return interests.filter((item) => item.name.toLowerCase().includes(q));
//   }, [search, interests]);

//   console.log("search:", search); //for debugging
//   console.log("filteredInterests:", filteredInterests); //for debugging
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "red" }}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Username at top */}
//       <Text style={styles.usernameText}>{username || "username"}</Text>

//       {/* Search Interests section */}
//       <View style={styles.searchSection}>
//         <Text style={styles.sectionTitle}>Search Interests</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="type search..."
//           value={search}
//           onChangeText={setSearch}
//         />

//         <View style={styles.searchResultsBox}>
//           <FlatList
//             data={filteredInterests}
//             keyExtractor={(item) => item.interest_id?.toString() ?? item.name}
//             renderItem={({ item }) => (
//               <Pressable
//                 style={styles.interestRow}
//                 onPress={() =>
//                   navigation.navigate("InterestDetail", {
//                     //InterestDetail is the name of the file I think, it used to be InterestDetailScreen but I renamed the file
//                     interestId: item.interest_id,
//                     interestName: item.name,
//                   })
//                 }
//               >
//                 <Text style={styles.interestText}>{item.name}</Text>
//               </Pressable>
//             )}
//           />
//         </View>
//       </View>

//       {/* Green button that does nothing for now
//       <View style={styles.buttonPlaceholder}>
//         <Text style={styles.buttonText}>
//           Search for people with similar interests
//         </Text>
//       </View> */}
//       {/* last working code */}
//       {/* <Pressable
//         style={styles.buttonPlaceholder}
//         onPress={() => navigation.navigate("LocationScreen")}
//       >
//         <Text style={styles.buttonText}>
//           Search for people with similar interests
//         </Text>
//       </Pressable> */}
//       {/* experiment code */}
//       {/* might need <View></View> wrapped around this Pressable, but maybe not */}
//       <Pressable style={styles.buttonPlaceholder} onPress={handleFindMatches}>
//         <Text style={styles.buttonText}>
//           Search for people with similar interests
//         </Text>
//       </Pressable>

//       {/* Interests list (we'll fill this later) */}
//       <Text style={styles.sectionTitle}>Interests</Text>

//       <View style={styles.searchResultsBox}>
//         <FlatList
//           data={userInterests}
//           keyExtractor={(item) => item.interest_id?.toString() ?? item.name}
//           renderItem={({ item }) => (
//             <Pressable
//               style={styles.interestRow}
//               onPress={() =>
//                 navigation.navigate("InterestDetail", {
//                   interestId: item.interest_id,
//                   interestName: item.name,
//                 })
//               }
//             >
//               <Text style={styles.interestText}>
//                 {item.name} — Score: {item.score}
//               </Text>
//             </Pressable>
//           )}
//           ListEmptyComponent={
//             <Text style={{ padding: 8 }}>
//               You haven’t scored any interests yet.
//             </Text>
//           }
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#ddd", // roughly like your mockup
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   usernameText: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//     textDecorationLine: "underline",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     textDecorationLine: "underline",
//     marginBottom: 8,
//   },
//   searchSection: {
//     marginBottom: 16,
//   },
//   searchInput: {
//     backgroundColor: "white",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   searchResultsBox: {
//     backgroundColor: "white",
//     borderRadius: 4,
//     maxHeight: 200,
//   },
//   interestRow: {
//     paddingVertical: 6,
//     paddingHorizontal: 8,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#ccc",
//   },
//   interestText: {
//     fontSize: 16,
//   },
//   buttonPlaceholder: {
//     marginVertical: 16,
//     padding: 12,
//     backgroundColor: "lightgreen",
//     borderWidth: 1,
//     borderColor: "green",
//     alignItems: "center",
//     borderRadius: 4,
//   },
//   buttonText: {
//     fontWeight: "600",
//   },
// });
// ==============================================================
import React, { useMemo, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
  getCurrentUserProfile,
  fetchInterests,
  fetchUserInterestScores,
  findNearbyMatches,
} from "../services/user";

const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [interests, setInterests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInterests, setUserInterests] = useState([]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const profile = await getCurrentUserProfile();
      setUsername(profile?.username || "");

      const allInterests = await fetchInterests();
      setInterests(allInterests || []);

      const scores = await fetchUserInterestScores();

      const interestById = {};
      for (const interest of allInterests || []) {
        interestById[interest.interest_id] = interest;
      }

      const combined = (scores || [])
        .map((s) => {
          const interest = interestById[s.is_interest_id];
          if (!interest) return null;
          return { ...interest, score: s.score };
        })
        .filter(Boolean);

      // optional: sort by score desc
      combined.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

      setUserInterests(combined);
    } catch (err) {
      console.log("Home load error:", err);
      setError(err?.message || "Something went wrong loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleFindMatches = async () => {
    try {
      const matches = await findNearbyMatches(10);
      console.log("MATCH RESULTS:", matches);
      navigation.navigate("LocationScreen", { matches });
    } catch (err) {
      console.log("Error finding matches:", err);
      Alert.alert("Error", err?.message || "Failed to find matches");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const filteredInterests = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return interests;
    return interests.filter((item) =>
      (item?.name || "").toLowerCase().includes(q)
    );
  }, [search, interests]);

  const renderSearchRow = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && { opacity: 0.6, transform: [{ scale: 0.99 }] },
      ]}
      onPress={() =>
        navigation.navigate("InterestDetail", {
          interestId: item.interest_id,
          interestName: item.name,
        })
      }
    >
      <Text style={styles.rowTitle}>{item.name}</Text>
      <Text style={styles.rowChevron}>›</Text>
    </Pressable>
  );

  const renderUserInterestRow = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && { opacity: 0.6, transform: [{ scale: 0.99 }] },
      ]}
      onPress={() =>
        navigation.navigate("InterestDetail", {
          interestId: item.interest_id,
          interestName: item.name,
        })
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{item.name}</Text>
        <Text style={styles.rowSub}>Your score: {item.score}</Text>
      </View>
      <View style={styles.scorePill}>
        <Text style={styles.scorePillText}>{item.score}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.username}>{username || "Welcome"}</Text>
        <Text style={styles.subtitle}>
          Search interests and find nearby matches
        </Text>
      </View>

      {/* Inline status */}
      {error ? (
        <View style={styles.alert}>
          <Text style={styles.alertTitle}>Couldn’t load</Text>
          <Text style={styles.alertText}>{error}</Text>
        </View>
      ) : null}

      {/* Search Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Search interests</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Type an interest…"
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <View style={styles.listBox}>
          {loading ? (
            <View style={styles.centerPad}>
              <ActivityIndicator />
              <Text style={styles.muted}>Loading…</Text>
            </View>
          ) : (
            <FlatList
              data={filteredInterests}
              keyExtractor={(item) => item.interest_id?.toString() ?? item.name}
              renderItem={renderSearchRow}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No interests match that search.
                </Text>
              }
            />
          )}
        </View>
      </View>

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [
          styles.cta,
          pressed && { transform: [{ scale: 0.99 }], opacity: 0.9 },
        ]}
        onPress={handleFindMatches}
        disabled={loading}
      >
        <Text style={styles.ctaTitle}>Find nearby matches</Text>
        <Text style={styles.ctaSubtitle}>Search within ~10 km</Text>
      </Pressable>

      {/* User Interests Card */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Your interests</Text>
          <Text style={styles.cardMeta}>{userInterests.length} total</Text>
        </View>

        <View style={styles.listBox}>
          {loading ? (
            <View style={styles.centerPad}>
              <ActivityIndicator />
              <Text style={styles.muted}>Loading…</Text>
            </View>
          ) : (
            <FlatList
              data={userInterests}
              keyExtractor={(item) => item.interest_id?.toString() ?? item.name}
              renderItem={renderUserInterestRow}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  You haven’t scored any interests yet.
                </Text>
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F7FB",
  },

  header: {
    marginTop: 8,
    marginBottom: 12,
  },
  username: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: "#111",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#555",
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
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

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },
  cardMeta: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },

  searchInput: {
    marginTop: 10,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111",
  },

  listBox: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    overflow: "hidden",
    maxHeight: 220,
  },

  row: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  rowSub: {
    marginTop: 3,
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  rowChevron: {
    fontSize: 22,
    color: "#bbb",
    paddingLeft: 10,
  },

  scorePill: {
    minWidth: 36,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  scorePillText: {
    fontWeight: "800",
    color: "#111",
  },

  cta: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#111",
    marginBottom: 12,
  },
  ctaTitle: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
  ctaSubtitle: {
    marginTop: 4,
    color: "#ddd",
    fontSize: 12,
    fontWeight: "600",
  },

  centerPad: { padding: 16, alignItems: "center", gap: 8 },
  muted: { color: "#666", fontSize: 13, fontWeight: "600" },
  emptyText: { padding: 14, color: "#666", fontSize: 13 },
});
