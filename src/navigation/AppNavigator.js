// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import SignUpScreen from "../screens/SignUpScreen";
// import LoginScreen from "../screens/LoginScreen";
// import Home from "../screens/Home";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SignUp">
//         <Stack.Screen
//           name="SignUp"
//           component={SignUpScreen}
//           options={{ title: "Create Account" }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ title: "Sign In" }}
//         />
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{ title: "Home" }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
// =================================================================
// src/navigation/AppNavigator.js
// src/navigation/AppNavigator.js
// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Home from "../screens/Home";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import { Text } from "react-native";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   // function Dummy() {
//   //   return <Text>Dummy Screen</Text>;
//   // }

//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUpScreen}
//         options={{ title: "Create Account" }}
//       />
//       <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
//     </Stack.Navigator>
//   );
// }
//=================================================================
// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Home from "../screens/Home";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="SignUp">
//       <Stack.Screen
//         name="SignUp"
//         component={SignUpScreen}
//         options={{ title: "Create Account" }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ title: "Sign In" }}
//       />
//       <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
//     </Stack.Navigator>
//   );
// }
//=================================================================
// import React from "react";
// import { View, Text } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// function DummyScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Dummy Screen</Text>
//     </View>
//   );
// }

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="Dummy">
//       <Stack.Screen name="Dummy" component={DummyScreen} />
//     </Stack.Navigator>
//   );
// }
//=================================================================
// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Home from "../screens/Home";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//       <Stack.Screen name="Home" component={Home} />
//     </Stack.Navigator>
//   );
// }
//=================================================================
// This works on Expo Go!!!
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
// most recent nav that works in expo go only
// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Home from "../screens/Home";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="SignUp">
//       <Stack.Screen
//         name="SignUp"
//         component={SignUpScreen}
//         options={{ title: "Create Account" }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ title: "Sign In" }}
//       />
//       <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
//     </Stack.Navigator>
//   );
// }
//=================================================================
// most recent working code
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Home from "../screens/Home";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import InterestDetailScreen from "../screens/InterestDetailScreen"; // this page doesn't have the stuff yet
// import LocationScreen from "../screens/LocationScreen";
// import MatchRevealScreen from "../screens/MatchRevealScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       {/* this is the screen for the interest detail page, not done yet. name, how does this relate to the interest_id from the table? I assume it is a different variable in a different file */}
//       <Stack.Screen
//         name="InterestDetail"
//         component={InterestDetailScreen}
//         options={{ title: "Interest" }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ title: "Sign In" }}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUpScreen}
//         options={{ title: "Create Account" }}
//       />
//       <Stack.Screen
//         name="MatchReveal"
//         component={MatchRevealScreen}
//         options={{ title: "Match" }}
//       />
//       <Stack.Screen name="LocationScreen" component={LocationScreen} />
//       <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
//     </Stack.Navigator>
//   );
// }
// =================================================================
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import InterestDetailScreen from "../screens/InterestDetailScreen";
import LocationScreen from "../screens/LocationScreen";
import MatchRevealScreen from "../screens/MatchRevealScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="InterestDetail"
        component={InterestDetailScreen}
        options={{ title: "Interest" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Sign In" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "Create Account" }}
      />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{ title: "Location" }}
      />
      <Stack.Screen
        name="MatchReveal"
        component={MatchRevealScreen}
        options={{ title: "Match" }}
      />
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
    </Stack.Navigator>
  );
}
