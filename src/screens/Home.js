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
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchUsers } from "../services/user";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAllUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetchUsers();

      // res should be an array (e.g. from supabase.from("profiles").select())
      setUsers(res || []);
      console.log("res", JSON.stringify(res, null, 2));
    } catch (err) {
      console.log("error in getAllUsers:", err);
      setError(err.message || "Something went wrong fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="red" size="large" />
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
      <Text style={styles.title}>Home</Text>

      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id?.toString() ?? String(index)}
        renderItem={({ item }) => (
          <View style={styles.userRow}>
            <Text style={styles.userText}>
              {/* adjust these fields to match what fetchUsers returns */}
              {item.user_id ?? item.id} {item.username}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 16 }}>No users found.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "green",
    marginBottom: 16,
  },
  userRow: {
    paddingVertical: 4,
  },
  userText: {
    fontSize: 18,
    color: "blue",
  },
});
