// // app.config.ts
// import { ExpoConfig } from "expo/config";

// const config: ExpoConfig = {
//   name: "Proximity",
//   slug: "proximity",
//   scheme: "proximity",
//   owner: "obemegargel", // optional but nice to have
//   android: { package: "com.proximityapp.obeme" },
//   ios: {
//     bundleIdentifier: "com.proximityapp.obeme",
//     infoPlist: {
//       NSBluetoothAlwaysUsageDescription:
//         "We use Bluetooth for short, on-demand discovery when you tap Discover. No GPS or contacts are collected.",
//     },
//   },
//   extra: {
//     eas: {
//       projectId: "262d1c8b-15ce-482a-8fe7-fdf3a87de6f9", // 👈 from the CLI message
//     },
//   },
// };

// export default config;

// app.config.ts
//____________________________________________________________________________________________different version
// import { ExpoConfig } from "expo/config";

// const config: ExpoConfig = {
//   name: "Proximity",
//   slug: "proximity",
//   scheme: "proximity",
//   owner: "obemegargel", // keeps the project under your Expo account
//   android: {
//     package: "com.proximityapp.obeme",
//     permissions: [
//       "CAMERA", // for QR scanner in the dev client
//       "BLUETOOTH_SCAN", // Android 12+
//       "BLUETOOTH_ADVERTISE", // Android 12+
//       "BLUETOOTH_CONNECT", // Android 12+
//       "ACCESS_FINE_LOCATION", // helps older Androids that still gate BLE scans
//     ],
//   },
//   ios: {
//     bundleIdentifier: "com.proximityapp.obeme",
//     infoPlist: {
//       NSBluetoothAlwaysUsageDescription:
//         "We use Bluetooth for short, on-demand discovery when you tap Discover. No GPS or contacts are collected.",
//       // No iOS location string needed for foreground BLE scans in this MVP.
//     },
//   },
//   plugins: [
//     "react-native-ble-plx", // optional; fine to keep
//     // react-native-ble-advertiser has no official config plugin; dev client covers it
//   ],
//   extra: {
//     eas: {
//       projectId: "262d1c8b-15ce-482a-8fe7-fdf3a87de6f9", // <- keep YOUR actual EAS project ID
//     },
//   },
// };

// export default config;
//____________________________________________________________________________________________different version
// export default {
//   expo: {
//     android: {
//       permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],
//     },
//     ios: {
//       infoPlist: {
//         NSLocationWhenInUseUsageDescription:
//           "Allow location so the app can find nearby people with similar interests.",
//       },
//     },
//   },
// };
// app.config.ts
//____________________________________________________________________________________________different version
export default {
  expo: {
    extra: {
      EXPO_PUBLIC_SUPABASE_URL: "https://pnconsmojtnizggtkspm.supabase.co",
      EXPO_PUBLIC_SUPABASE_ANON_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuY29uc21vanRuaXpnZ3Rrc3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5ODQ2NDUsImV4cCI6MjA3NjU2MDY0NX0.ex3F5l5SMqT1a9PaOGECL2UiUdwkQCrCSW5G3yV9YrM", // anon key
    },
  },
};
