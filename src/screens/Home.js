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
import React, { useEffect, useState, useMemo, use } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  getCurrentUserProfile,
  fetchInterests,
  fetchUserInterestScores,
} from "../services/user";
import { Pressable } from "react-native"; //might not work yet
import { useFocusEffect } from "@react-navigation/native";

// why does the { navigation } work here but not in previous versions? my guess because navigation is for the interest inside this whole thing
const Home = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [interests, setInterests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [fetchUserInterestScores, setUserInterests] = useState([]);
  const [userInterests, setUserInterests] = useState([]); // hopefull this is in the right spot. it is for fetching user's interests

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      // 1) Get logged-in user's username
      const profile = await getCurrentUserProfile();
      setUsername(profile.username || "");

      // 2) Get all interests
      const allInterests = await fetchInterests();
      setInterests(allInterests);
      console.log("allInterests from Supabase:", allInterests); // for debugging

      // 3) Get user's interest scores
      const scores = await fetchUserInterestScores();

      // Build a lookup map from interest_id -> interest object
      const interestById = {};
      for (const interest of allInterests) {
        interestById[interest.interest_id] = interest;
      }

      // 4) Combine into "userInterests" with name + score
      const combined = scores
        .map((s) => {
          const interest = interestById[s.is_interest_id];
          if (!interest) return null;
          return {
            ...interest,
            score: s.score,
          };
        })
        .filter(Boolean);

      setUserInterests(combined);
    } catch (err) {
      console.log("Home load error:", err);
      setError(err.message || "Something went wrong loading data");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   loadData();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      // This runs every time the Home screen comes into focus
      loadData();
    }, [])
  );

  // Filter interests based on search text
  const filteredInterests = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return interests;

    // startsWith search (e.g., "sk" matches "skiing")
    // return interests.filter((item) => item.name.toLowerCase().startsWith(q));
    return interests.filter((item) => item.name.toLowerCase().includes(q));
  }, [search, interests]);

  console.log("search:", search); //for debugging
  console.log("filteredInterests:", filteredInterests); //for debugging
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Username at top */}
      <Text style={styles.usernameText}>{username || "username"}</Text>

      {/* Search Interests section */}
      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Search Interests</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="type search..."
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.searchResultsBox}>
          <FlatList
            data={filteredInterests}
            keyExtractor={(item) => item.interest_id?.toString() ?? item.name}
            renderItem={({ item }) => (
              <Pressable
                style={styles.interestRow}
                onPress={() =>
                  navigation.navigate("InterestDetail", {
                    //InterestDetail is the name of the file I think, it used to be InterestDetailScreen but I renamed the file
                    interestId: item.interest_id,
                    interestName: item.name,
                  })
                }
              >
                <Text style={styles.interestText}>{item.name}</Text>
              </Pressable>
            )}
          />
        </View>
      </View>

      {/* Green button that does nothing for now
      <View style={styles.buttonPlaceholder}>
        <Text style={styles.buttonText}>
          Search for people with similar interests
        </Text>
      </View> */}
      <Pressable
        style={styles.buttonPlaceholder}
        onPress={() => navigation.navigate("LocationScreen")}
      >
        <Text style={styles.buttonText}>
          Search for people with similar interests
        </Text>
      </Pressable>

      {/* Interests list (we'll fill this later) */}
      <Text style={styles.sectionTitle}>Interests</Text>

      <View style={styles.searchResultsBox}>
        <FlatList
          data={userInterests}
          keyExtractor={(item) => item.interest_id?.toString() ?? item.name}
          renderItem={({ item }) => (
            <Pressable
              style={styles.interestRow}
              onPress={() =>
                navigation.navigate("InterestDetail", {
                  interestId: item.interest_id,
                  interestName: item.name,
                })
              }
            >
              <Text style={styles.interestText}>
                {item.name} — Score: {item.score}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={{ padding: 8 }}>
              You haven’t scored any interests yet.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ddd", // roughly like your mockup
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 8,
  },
  searchSection: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  searchResultsBox: {
    backgroundColor: "white",
    borderRadius: 4,
    maxHeight: 200,
  },
  interestRow: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  interestText: {
    fontSize: 16,
  },
  buttonPlaceholder: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: "lightgreen",
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
  },
});
