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
// MOST RECENT VERSION
// import React, { useState } from "react";
// import { View, TextInput, Button, Text } from "react-native";
// import { signInWithEmail } from "../services/user";

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setErrorMessage("");
//     setLoading(true);
//     try {
//       await signInWithEmail({ email, password });
//       navigation.replace("Home");
//     } catch (err) {
//       setErrorMessage(err.message); // see Supabase's exact error object for message
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
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
      setErrorMessage(err?.message ?? "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.trim().length > 0 && password.length > 0 && !loading;

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue.</Text>
        </View>

        {/* Error */}
        {errorMessage ? (
          <View style={styles.alert}>
            <Text style={styles.alertTitle}>Couldn’t sign in</Text>
            <Text style={styles.alertText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#777"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#777"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Pressable
            style={({ pressed }) => [
              styles.primaryBtn,
              !canSubmit && styles.btnDisabled,
              pressed && canSubmit && styles.btnPressed,
            ]}
            onPress={handleLogin}
            disabled={!canSubmit}
          >
            {loading ? (
              <View style={styles.inlineRow}>
                <ActivityIndicator />
                <Text style={styles.primaryBtnText}> Signing in…</Text>
              </View>
            ) : (
              <Text style={styles.primaryBtnText}>Log in</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("SignUp")}
            style={({ pressed }) => [
              styles.linkBtn,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Text style={styles.linkText}>
              Don’t have an account?{" "}
              <Text style={styles.linkTextBold}>Sign up</Text>
            </Text>
          </Pressable>
        </View>

        {/* Optional footer */}
        <Text style={styles.footerHint}>
          Tip: If you get a login error, double-check email spelling and
          password.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  header: {
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
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
  alertTitle: { fontWeight: "900", marginBottom: 4, color: "#8a1f1f" },
  alertText: { color: "#8a1f1f" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },

  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#444",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111",
  },

  primaryBtn: {
    marginTop: 16,
    backgroundColor: "#111",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
  },

  btnDisabled: {
    opacity: 0.55,
  },
  btnPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },

  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  linkBtn: {
    marginTop: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#2F5BEA",
    fontWeight: "700",
  },
  linkTextBold: {
    fontWeight: "900",
  },

  footerHint: {
    marginTop: 12,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});
