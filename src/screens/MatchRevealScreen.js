// import React from "react";
// import { View, Text, StyleSheet, ImageBackground } from "react-native";

// const WALLPAPERS = {
//   cheetah: require("../wallpapers/cheetah.png"),
//   zebra: require("../wallpapers/zebra.png"),
//   sky: require("../wallpapers/sky.png"),
//   turtles: require("../wallpapers/turtles.png"),
// };

// export default function MatchRevealScreen({ route }) {
//   const { code, wallpaper_key } = route.params || {};

//   const bg = WALLPAPERS[wallpaper_key] ?? WALLPAPERS.sky;

//   return (
//     <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
//       <View style={styles.overlay}>
//         <Text style={styles.title}>It’s a match!</Text>
//         <Text style={styles.code}>{code ?? "----"}</Text>
//         <Text style={styles.subtitle}>You should both see the same code.</Text>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   bg: { flex: 1 },
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//     backgroundColor: "rgba(0,0,0,0.25)",
//   },
//   title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 12 },
//   code: {
//     fontSize: 72,
//     fontWeight: "900",
//     color: "white",
//     letterSpacing: 8,
//     marginBottom: 12,
//   },
//   subtitle: { fontSize: 14, color: "white" },
// });
// =================================================================
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const WALLPAPERS = {
  cheetah: require("../wallpapers/cheetah.png"),
  zebra: require("../wallpapers/zebra.png"),
  sky: require("../wallpapers/sky.png"),
  turtles: require("../wallpapers/turtles.png"),
};

export default function MatchRevealScreen({ route }) {
  const { code, wallpaper_key } = route.params || {};
  const bg = WALLPAPERS[wallpaper_key] ?? WALLPAPERS.sky;

  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.title}>It’s a match!</Text>
        <Text style={styles.code}>{code ?? "----"}</Text>
        <Text style={styles.subtitle}>You should both see the same code.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "white", marginBottom: 12 },
  code: {
    fontSize: 72,
    fontWeight: "900",
    color: "white",
    letterSpacing: 8,
    marginBottom: 12,
  },
  subtitle: { fontSize: 14, color: "white" },
});
