// import React, { useState } from "react";
// import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
// import { loginWithEmail } from "../services/user";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setErrorMessage("");
//     setLoading(true);

//     try {
//       await loginWithEmail({ email, password });
//       // If login worked, go to Home
//       navigation.replace("Home");
//     } catch (err) {
//       setErrorMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Email"
//         autoCapitalize="none"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//         style={{ marginBottom: 10 }}
//       />

//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={{ marginBottom: 10 }}
//       />

//       <Button
//         title={loading ? "Signing in..." : "Sign In"}
//         onPress={handleLogin}
//         disabled={loading}
//       />

//       {errorMessage ? (
//         <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
//       ) : null}

//       <TouchableOpacity
//         onPress={() => navigation.replace("SignUp")}
//         style={{ marginTop: 20 }}
//       >
//         <Text style={{ color: "blue" }}>Don't have an account? Create one</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// =================================================================
// src/screens/LoginScreen.js
// import * as React from "react";
// import { View, Text, Button } from "react-native";

// export default function LoginScreen({ navigation }) {
//   const handleFakeLogin = () => {
//     // later: check Supabase auth result here
//     navigation.replace("Home"); // go to Home and remove Login from history
//   };

//   return (
//     <View>
//       <Text>Login Screen</Text>

//       <Button title="Log in (fake)" onPress={handleFakeLogin} />

//       <Button
//         title="Go to Sign Up"
//         onPress={() => navigation.navigate("SignUp")}
//       />
//     </View>
//   );
// }
// ==================================================================
// import React, { useState } from "react";
// import { View, TextInput, Button, Text } from "react-native";
// import { signUpWithEmail } from "../services/user";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setErrorMessage("");
//     setLoading(true);
//     try {
//       await signUpWithEmail({ email, password });
//       navigation.replace("Home");
//     } catch (err) {
//       setErrorMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Email"
//         autoCapitalize="none"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//         style={{ marginBottom: 10 }}
//       />

//       <TextInput
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//         style={{ marginBottom: 10 }}
//       />

//       <Button
//         title={loading ? "Signing in..." : "Log In"}
//         onPress={handleLogin}
//         disabled={loading}
//       />

//       {errorMessage ? (
//         <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
//       ) : null}

//       <Text
//         style={{ marginTop: 20, color: "blue" }}
//         onPress={() => navigation.navigate("SignUp")}
//       >
//         Don't have an account? Sign up
//       </Text>
//     </View>
//   );
// }
// ==================================================================
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signInWithEmail } from "../services/user";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      await signInWithEmail({ email, password });
      navigation.replace("Home");
    } catch (err) {
      setErrorMessage(err.message); // see Supabase's exact error object for message
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10 }}
      />

      <Button
        title={loading ? "Signing in..." : "Log In"}
        onPress={handleLogin}
        disabled={loading}
      />

      {errorMessage ? (
        <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
      ) : null}

      <Text
        style={{ marginTop: 20, color: "blue" }}
        onPress={() => navigation.navigate("SignUp")}
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
}
