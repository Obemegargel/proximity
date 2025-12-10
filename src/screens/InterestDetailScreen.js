import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import {
  getInterestScore,
  saveInterestScore,
  deleteInterestScore,
} from "../services/user";

export default function InterestDetailScreen({ route, navigation }) {
  const { interestId, interestName } = route.params;

  const [score, setScore] = useState(""); // textbox value as string
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load existing score (if any) on mount
  useEffect(() => {
    const loadScore = async () => {
      try {
        setLoading(true);
        setError("");

        const existingScore = await getInterestScore({ interestId });
        if (existingScore != null) {
          setScore(existingScore.toString());
        }
      } catch (err) {
        console.log("loadScore error:", err);
        setError(err.message || "Failed to load score");
      } finally {
        setLoading(false);
      }
    };

    loadScore();
  }, [interestId]);

  const handleSave = async () => {
    setError("");

    // basic validation: integer 1–5
    const numeric = parseInt(score, 10);
    if (Number.isNaN(numeric) || numeric < 1 || numeric > 5) {
      setError("Please enter a whole number between 1 and 5.");
      return;
    }

    try {
      setLoading(true);
      await saveInterestScore({ interestId, score: numeric });
      Alert.alert("Saved", "Your interest score has been saved.");
      // you could also navigate back:
      // navigation.goBack();
    } catch (err) {
      console.log("saveInterestScore error:", err);
      setError(err.message || "Failed to save score");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError("");
    try {
      setLoading(true);
      await deleteInterestScore({ interestId });
      setScore("");
      Alert.alert("Deleted", "Your score for this interest was removed.");
    } catch (err) {
      console.log("deleteInterestScore error:", err);
      setError(err.message || "Failed to delete score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Interest name at the top */}
      <Text style={styles.interestName}>{interestName}</Text>

      {/* "Type Score" label */}
      <Text style={styles.label}>Type Score:</Text>

      {/* Score input */}
      <TextInput
        style={styles.input}
        value={score}
        onChangeText={setScore}
        keyboardType="numeric"
        placeholder="1–5"
      />

      {/* Error message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Save / Delete buttons */}
      <View style={styles.buttonWrapper}>
        <Button title={loading ? "Saving..." : "Save"} onPress={handleSave} />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title={loading ? "Deleting..." : "Delete"}
          onPress={handleDelete}
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#888",
    padding: 24,
  },
  interestName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonWrapper: {
    marginVertical: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
