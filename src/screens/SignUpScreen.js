// // MOST RECENT WORKING CODE
// // Import needed functions from files etc
// import React, { useState } from "react"; // Might not need to save it as React but I do need useState, I choose to keep it how it is.
// import { View, TextInput, Button, Text } from "react-native"; //Do I need this? What does it do?
// import { supabase } from "../../supabaseClient";

// export default function SignUpScreen() {
//   // are these states? what is a state and what does that mean/do?
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // do I need this? should it be named something else?
//   const [loading, setLoading] = useState(false);

//   const handleSignUp = async () => {
//     setErrorMessage("");

//     // 1) Create auth user
//     const { data, error } = await supabase.auth.signUp({ email, password });
//     if (error) {
//       setErrorMessage(error.message);
//       return;
//     }

//     const user = data.user; // 👈 you already get the user here this just makes it so you don't have to type data.user each time you reference it.

//     // 2) Insert into profiles table
//     const { error: profileError } = await supabase.from("profiles").insert({
//       id: user.id,
//       username: username,
//     });

//     if (profileError) {
//       setErrorMessage(profileError.message);
//       return;
//     }

//     alert("Account Created Successfully!");
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Username"
//         autoCapitalize="none"
//         value={username}
//         onChangeText={setUsername}
//         style={{ marginBottom: 10 }}
//       />

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

//       <Button title="Sign Up" onPress={handleSignUp} />

//       {errorMessage ? (
//         <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
//       ) : null}
//     </View>
//   );
// }
// ==================================================================
// attempt 2 that never worked
// import { signUpWithEmail } from "../services/user";

// const handleSignUp = async () => {
//   setErrorMessage("");
//   setLoading(true);
//   try {
//     await signUpWithEmail({ email, password, username });
//     alert("Account Created Successfully!");
//     // later: navigation.replace("Login");
//   } catch (err) {
//     setErrorMessage(err.message);
//   } finally {
//     setLoading(false);
//   }
// };
// ==================================================================
// src/services/user.js
// src/screens/SignUpScreen.js
// MOST RECENT WORKING CODE
// import React, { useState } from "react";
// import { View, TextInput, Button, Text } from "react-native";
// import { signUpWithEmail } from "../services/user";

// export default function SignUpScreen({ navigation }) {
//   // state for form + UI
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSignUp = async () => {
//     setErrorMessage("");
//     setLoading(true);

//     try {
//       await signUpWithEmail({ email, password, username });
//       // alert("Account Created Successfully!");
//       navigation.replace("Login"); // replace makes it so pressing back doesn't go back to sign up
//       // navigation.navigate("Home"); // navigate would let you go back to sign up by pressing back, both work but for auth usually replace is best.
//     } catch (err) {
//       setErrorMessage(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput
//         placeholder="Username"
//         autoCapitalize="none"
//         value={username}
//         onChangeText={setUsername}
//         style={{ marginBottom: 10 }}
//       />

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
//         title={loading ? "Creating account..." : "Sign Up"}
//         onPress={handleSignUp}
//         disabled={loading}
//       />

//       {/* this is jsx, possibly the whole return is jsx */}
//       {errorMessage ? (
//         <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
//       ) : null}

//       {/* this lets users jump to the login screen without signing up again. */}
//       <Text
//         style={{ marginTop: 20, color: "blue" }}
//         onPress={() => navigation.navigate("Login")}
//       >
//         Already have an account? Sign In
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
import { signUpWithEmail } from "../services/user";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setErrorMessage("");
    setLoading(true);

    try {
      await signUpWithEmail({
        email: email.trim(),
        password,
        username: username.trim(),
      });
      navigation.replace("Login");
    } catch (err) {
      setErrorMessage(err?.message ?? "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit =
    username.trim().length >= 2 &&
    email.trim().length > 0 &&
    password.length >= 6 &&
    !loading;

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Set up your profile to get started.
          </Text>
        </View>

        {/* Error */}
        {errorMessage ? (
          <View style={styles.alert}>
            <Text style={styles.alertTitle}>Couldn’t sign up</Text>
            <Text style={styles.alertText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="yourname"
            placeholderTextColor="#777"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <Text style={styles.helper}>This is what other people will see.</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
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
            placeholder="At least 6 characters"
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
            onPress={handleSignUp}
            disabled={!canSubmit}
          >
            {loading ? (
              <View style={styles.inlineRow}>
                <ActivityIndicator />
                <Text style={styles.primaryBtnText}> Creating…</Text>
              </View>
            ) : (
              <Text style={styles.primaryBtnText}>Sign up</Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={({ pressed }) => [
              styles.linkBtn,
              pressed && { opacity: 0.6 },
            ]}
          >
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={styles.linkTextBold}>Sign in</Text>
            </Text>
          </Pressable>
        </View>

        {/* Optional footer */}
        <Text style={styles.footerHint}>
          By signing up, you agree to use the app respectfully.
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
  helper: {
    marginTop: 6,
    fontSize: 12,
    color: "#777",
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
