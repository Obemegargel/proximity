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
// src/screens/LocationScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { supabase } from "../../supabaseClient"; // 👈 correct path from /src/screens

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Get location and save it to Supabase
  const getAndSaveLocation = async () => {
    try {
      setErrorMsg("");

      // 1) Ask for permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      // 2) Get current position
      const loc = await Location.getCurrentPositionAsync({}); // this is the current location
      setLocation(loc);

      const { latitude, longitude } = loc.coords; // pulls out just the latitude and longitude from loc

      // 3) Get current user from Supabase auth
      // access data.user to get user info that would be the whole {user: {id: "uuid...", email: ... "}} the whole object
      const {
        data: { user }, // {user: { id: "uuid...", email: "x@y.com", ... }} is the format that data is stored as
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) {
        throw new Error("No logged-in user.");
      }

      // 4) Save lat/lng to profiles table
      // what does await do? A) it waits for the update to finish, if there is an error it is stored in error
      const { error } = await supabase
        .from("profiles")
        .update({
          lat: latitude, // is lat the name of the column in supabase?
          lng: longitude,
        })
        .eq("id", user.id);

      if (error) throw error;

      console.log("Location saved to Supabase:", { latitude, longitude });
    } catch (err) {
      console.log("LocationScreen error:", err);
      setErrorMsg(err.message ?? "Something went wrong getting location.");
    }
  };

  // Run once when screen mounts
  useEffect(() => {
    getAndSaveLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocationScreen</Text>

      <Text style={styles.label}>Your Location:</Text>
      <Text style={styles.locationText}>
        {location ? JSON.stringify(location.coords, null, 2) : "Loading..."}
      </Text>

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      {/* Manual refresh button */}
      <Button title="Refresh Location" onPress={getAndSaveLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationText: {
    fontFamily: "monospace",
    fontSize: 12,
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});
