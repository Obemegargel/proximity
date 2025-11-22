// MOST RECENT WORKING CODE
// Import needed functions from files etc
import React, { useState } from "react"; // Might not need to save it as React but I do need useState, I choose to keep it how it is.
import { View, TextInput, Button, Text } from "react-native"; //Do I need this? What does it do?
import { supabase } from "../../supabaseClient";

export default function SignUpScreen() {
  // are these states? what is a state and what does that mean/do?
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // do I need this? should it be named something else?
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setErrorMessage("");

    // 1) Create auth user
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const user = data.user; // 👈 you already get the user here this just makes it so you don't have to type data.user each time you reference it.

    // 2) Insert into profiles table
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      username: username,
    });

    if (profileError) {
      setErrorMessage(profileError.message);
      return;
    }

    alert("Account Created Successfully!");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10 }}
      />

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

      <Button title="Sign Up" onPress={handleSignUp} />

      {errorMessage ? (
        <Text style={{ color: "red", marginTop: 10 }}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}
// ==================================================================
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
