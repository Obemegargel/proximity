//=================================================================
// MOST RECENT WORKING CODE
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
// import from screens
import Home from "./src/screens/Home"; // <-- NOTE: src/screens
import SignUpScreen from "./src/screens/SignUpScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpScreen />
      {/* <Home /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
//=================================================================
