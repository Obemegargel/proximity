import {
  ActivityIndicator,
  FlatList,
  SafeAreaViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { fetchUsers } from "../services/user";

const Home = () => {
  // keep 3 states here
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchUsers();

      // update user state
      setUsers(res);
      console.log("res", JSON.stringify(res, null, 2));
    } catch (error) {
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Add guard clauses

  if (loading) {
    return <ActivityIndicator color={"red"} size={"large"} />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }
  return (
    <View>
      <Text style={{ fontSize: 42, color: "green" }}>Home</Text>

      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={{ fontSize: 18, color: "blue" }}>
                {item.user_id} {item.username}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
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
