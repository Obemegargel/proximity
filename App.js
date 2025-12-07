//=================================================================
// MOST RECENT WORKING CODE
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, View } from "react-native";
// // import from screens
// import Home from "./src/screens/Home"; // <-- NOTE: src/screens
// import SignUpScreen from "./src/screens/SignUpScreen";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <SignUpScreen />
//       {/* <Home /> */}
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
//=================================================================
// In App.js in a new project

// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/navigation/AppNavigator";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// }
// =================================================================
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Plain RN Works</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
// =================================================================
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Text } from "react-native";

// const Stack = createNativeStackNavigator();

// function DummyScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Dummy Screen</Text>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Dummy">
//         <Stack.Screen name="Dummy" component={DummyScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// =================================================================
// // This works on Expo Go!!!
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, Text } from "react-native";

// const Stack = createNativeStackNavigator();

// function DummyScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Dummy Screen</Text>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Dummy">
//         <Stack.Screen name="Dummy" component={DummyScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
//=================================================================
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
