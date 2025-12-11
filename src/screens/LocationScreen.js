import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Location permission denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  return (
    <View>
      <Text>Your Location:</Text>
      <Text>{JSON.stringify(location)}</Text>
      {errorMsg ? <Text style={{ color: "red" }}>{errorMsg}</Text> : null}
    </View>
  );
}
