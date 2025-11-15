// import React, { useEffect, useMemo, useRef, useState } from "react"; // brings React plus common hooks. a hook = a function that lets you "hook into" React features such as stat, lifecycle, refs, and (maybe memoization). a common hook is generally termed when refering to built-in hooks that people use all the time. Q: is memoization a React feature and is it accessible via a hook?
// import { Platform, View, Text, Button, FlatList, Alert } from "react-native"; // pulls RN primatives, cross-platform OS info, and UI components Q: what are RN primatives?
// import { BleManager, Device } from "react-native-ble-plx"; // the BLE library core classes. (NOTE: Device is imported but not directly used).
// import {
//   request,
//   PERMISSIONS,
//   RESULTS,
//   openSettings,
//   type Permission,
// } from "react-native-permissions"; // permission imports give me runtime permission APIs on Android, Permission is a type for the permission constants I'll request.

// type Seen = { id: string; name: string | null; rssi: number | null }; // a minimal shape for devices discovered via BLE advertising.

// // Here is the main app component
// export default function App() {
//   const managerRef = useRef<BleManager | null>(null); // BleManager is a class that handles all Bluetooth Low Energy operations. it lives across renders. it is set to null when empty. managerRef is a variable that represents this class. Much like naming a specific list or array except instead of type list it is type BleManager.
//   const [scanning, setScanning] = useState(false); // scanning is a variable that tracks if a scan is ongoing or not.
//   const [devices, setDevices] = useState<Record<string, Seen>>({}); // devices is a dictionary of Seen devices, keyed by device ID.

//   // create/destroy the BLE manager once
//   useEffect(() => {
//     const m = new BleManager();
//     managerRef.current = m;
//     return () => {
//       m.destroy();
//       managerRef.current = null;
//     };
//   }, []);

//   // useMemo converts the devices map into an array and sorts by RSSI(signal strength) descending.
//   // if missing RSSI it auto sets value super low for fast sorting.
//   // This recomputes only when devices changes.
//   // list is a memoized array of Seen devices, sorted by RSSI (signal strength).
//   // useMemo is a hook that memoizes the result of a function, recomputing it only when its dependencies change.
//   // Here, it recomputes when 'devices' changes.  //Q: do I understand this correctly?
//   const list = useMemo(
//     () =>
//       Object.values(devices).sort(
//         (a, b) => (b.rssi ?? -999) - (a.rssi ?? -999)
//       ),
//     [devices]
//   );

//   // ask runtime permissions as needed
//   // ensurePermissions is an async function that checks and requests necessary Bluetooth permissions on Android such as:
//   // BLUETOOTH_SCAN, BLUETOOTH_CONNECT and ACCESS_FINE_LOCATION (for Android < 31) due to older Android behavior.
//   // Iterates each permission, if any is not granted/limited, it shows an Alert offering to open Settings and returns false
//   // otherwise returns true.
//   async function ensurePermissions() {
//     if (Platform.OS !== "android") return true;

//     // Use Permission[] so request(p) is correctly typed
//     const wants: Permission[] = [
//       PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
//       PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
//     ];

//     // Android API < 31 (Android 12) may still require Fine Location for scans
//     const apiLevel = Number(Platform.Version); // e.g. 30, 31, 34
//     if (apiLevel < 31) {
//       wants.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//     }

//     for (const p of wants) {
//       const res = await request(p);
//       if (!(res === RESULTS.GRANTED || res === RESULTS.LIMITED)) {
//         Alert.alert(
//           "Permission needed",
//           "Bluetooth permission is required for scanning.",
//           [
//             { text: "Open settings", onPress: () => openSettings() },
//             { text: "OK" },
//           ]
//         );
//         return false;
//       }
//     }
//     return true;
//   }

//   // Bails if the manager isn't ready. Resets device list and sets scanning=true.
//   // Calls manager.startDeviceScan(null, { allowDuplicates: false }, callback) to scan all advertisments without duplicate callbacks.
//   // In the callback, if error occurs, it stops scanning and surgaces teh error message.
//   //                  on device it adds it to state if we haven't seen its id before, storing id, best available name (name or localName, and rssi).
//   // schedules stopScan after roughly 20 seconds.
//   function startScan() {
//     const manager = managerRef.current;
//     if (!manager) return;

//     setDevices({});
//     setScanning(true);

//     manager.startDeviceScan(
//       null, // all advertisements
//       { allowDuplicates: false },
//       (error, device) => {
//         if (error) {
//           setScanning(false);
//           Alert.alert("Scan error", String(error.message ?? error));
//           return;
//         }
//         if (!device) return;

//         setDevices((prev) => {
//           if (prev[device.id]) return prev;
//           return {
//             ...prev,
//             [device.id]: {
//               id: device.id,
//               name: device.name ?? device.localName ?? null,
//               rssi: device.rssi ?? null,
//             },
//           };
//         });
//       }
//     );

//     // stop after ~20 seconds
//     setTimeout(stopScan, 20000);
//   }

//   // this stops it after roughly 20 seconds
//   // stops teh native scan (safe even if already stopped) and clears scanning variable.
//   function stopScan() {
//     const manager = managerRef.current;
//     try {
//       manager?.stopDeviceScan();
//     } catch {}
//     setScanning(false);
//   }

//   // this returns the UI (what you see on screen)
//   // Root View adds padding; a title explians it's a scan demo
//   // The Discover / Scanning button if already scanning it stops, otherwise it awaits ensurePermissions() and if OK starts a scan.
//   // a status line shows either the number of devices, "scanning..." or "No devices yet."
//   // Flatlist (used farther down) renders the sorted list. each row shows name (or "(no name)"), the device id, and the RSSI (or ? if unknown). Thin dividers separate rows.
//   return (
//     <View style={{ flex: 1, paddingTop: 64, paddingHorizontal: 16 }}>
//       <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
//         Proximity (scan demo)
//       </Text>
//       <Text style={{ marginBottom: 16, opacity: 0.7 }}>
//         Tap Discover to scan for ~20s and list nearby BLE advertisers.
//       </Text>

//       <Button
//         title={scanning ? "Scanning…" : "Discover"}
//         onPress={async () => {
//           if (scanning) {
//             stopScan();
//             return;
//           }
//           const ok = await ensurePermissions();
//           if (ok) startScan();
//         }}
//       />

//       <Text style={{ marginTop: 16, fontWeight: "600" }}>
//         {list.length
//           ? `Found ${list.length} device(s):`
//           : scanning
//           ? "Scanning…"
//           : "No devices yet."}
//       </Text>

//       <FlatList
//         style={{ marginTop: 8 }}
//         data={list}
//         keyExtractor={(d) => d.id}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               paddingVertical: 8,
//               borderBottomWidth: 1,
//               borderBottomColor: "#eee",
//             }}
//           >
//             <Text style={{ fontWeight: "600" }}>
//               {item.name ?? "(no name)"}
//             </Text>
//             <Text style={{ fontSize: 12, opacity: 0.7 }}>
//               {item.id} • RSSI {item.rssi ?? "?"}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }
// App.tsx
//____________________________________________________________________________________________different version
// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, Button } from "react-native";
// import { supabase } from "./supabaseClient";

// type Meta = { id: string; name: string };

// export default function App() {
//   const userId = "user-123";
//   const [peers, setPeers] = useState<Meta[]>([]);
//   const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

//   useEffect(() => {
//     const channel = supabase.channel("cell:demo", {
//       config: { presence: { key: userId } },
//     });

//     channel.on("presence", { event: "sync" }, () => {
//       const state = channel.presenceState<Meta>();
//       // state is { [userKey]: Meta[] }, flatten and remove me
//       const others = Object.values(state).flat() as Meta[];
//       setPeers(others.filter((p) => p.id !== userId));
//     });

//     channel.on("broadcast", { event: "accept" }, ({ payload }) => {
//       console.log("accept broadcast", payload);
//     });

//     channel.subscribe(async (status) => {
//       if (status === "SUBSCRIBED") {
//         await channel.track<Meta>({ id: userId, name: "You" });
//       }
//     });

//     channelRef.current = channel;
//     return () => {
//       supabase.removeChannel(channel);
//     }; // cleanup on unmount
//   }, []);

//   const sendAccept = (toId: string) => {
//     channelRef.current?.send({
//       type: "broadcast",
//       event: "accept",
//       payload: { from: userId, to: toId },
//     });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: "600" }}>
//         Peers in cell:demo
//       </Text>
//       {peers.length === 0 ? (
//         <Text style={{ marginTop: 8, opacity: 0.7 }}>No one else yet.</Text>
//       ) : (
//         peers.map((p) => (
//           <View key={p.id} style={{ marginTop: 12 }}>
//             <Text>
//               {p.name} ({p.id})
//             </Text>
//             <Button title="Accept" onPress={() => sendAccept(p.id)} />
//           </View>
//         ))
//       )}
//     </View>
//   );
// }
//____________________________________________________________________________________________different version
// last code before watching tutorial 10/30/2025
// import React, { useEffect, useRef, useState } from "react";

// import {
//   SafeAreaView,
//   View,
//   Text,
//   Button,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// // import { supabase } from "./supabaseclient";
// import { supabase } from "./supabaseClient";

// type Meta = { id: string; name: string };

// function pairColorAndCode(a: string, b: string) {
//   const seedStr = a < b ? a + b : b + a;
//   let h = 0;
//   for (let i = 0; i < seedStr.length; i++)
//     h = (h << 5) - h + seedStr.charCodeAt(i);
//   const palette = [
//     "#FF6B6B",
//     "#FFB020",
//     "#FFD93D",
//     "#6BCB77",
//     "#4D96FF",
//     "#6A4C93",
//     "#00B8A9",
//   ];
//   const color = palette[Math.abs(h) % palette.length];
//   const code = String(Math.abs(h) % 10000).padStart(4, "0");
//   return { color, code };
// }

// export default function App() {
//   const userId = "user-123"; // TODO: replace with real auth/user id
//   const [peers, setPeers] = useState<Meta[]>([]);
//   const [match, setMatch] = useState<{ color: string; code: string } | null>(
//     null
//   );
//   const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
//   const acceptTarget = useRef<string | null>(null);

//   useEffect(() => {
//     // Everyone joins the same demo room. Later, replace with a geohash cell string.
//     const channel = supabase.channel("cell:demo", {
//       config: { presence: { key: userId } },
//     });

//     // Presence updates
//     channel.on("presence", { event: "sync" }, () => {
//       const state = channel.presenceState();

//       // Coerce the library’s loose type to what we actually track.
//       const all = (Object.values(state).flat() as unknown as any[])
//         .map((p): Meta => ({ id: p.id, name: p.name })) // pick only what you need
//         .filter((p) => p.id !== userId);

//       setPeers(all);
//     });

//     // Accept handshake
//     channel.on("broadcast", { event: "accept" }, ({ payload }) => {
//       const { from, to } = payload as { from: string; to: string };
//       if (to === userId && acceptTarget.current === from) {
//         const { color, code } = pairColorAndCode(userId, from);
//         setMatch({ color, code });
//         channel.send({
//           type: "broadcast",
//           event: "matched",
//           payload: { a: userId, b: from, color, code },
//         });
//       }
//     });

//     // Matched message (either side)
//     channel.on("broadcast", { event: "matched" }, ({ payload }) => {
//       const { a, b, color, code } = payload as {
//         a: string;
//         b: string;
//         color: string;
//         code: string;
//       };
//       if (a === userId || b === userId) setMatch({ color, code });
//     });

//     // Subscribe and advertise our presence
//     channel.subscribe(async (status) => {
//       if (status === "SUBSCRIBED") {
//         const me: Meta = { id: userId, name: "You" };
//         await channel.track(me); // <-- no <Meta> here
//       }
//     });

//     channelRef.current = channel;
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const sendAccept = (toId: string) => {
//     acceptTarget.current = toId;
//     channelRef.current?.send({
//       type: "broadcast",
//       event: "accept",
//       payload: { from: userId, to: toId },
//     });
//   };

//   // Matched screen
//   if (match) {
//     return (
//       <SafeAreaView
//         style={{
//           flex: 1,
//           backgroundColor: match.color,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Text style={{ fontSize: 24, color: "white", fontWeight: "700" }}>
//           Matched!
//         </Text>
//         <Text style={{ fontSize: 18, color: "white", marginTop: 8 }}>
//           Code: {match.code}
//         </Text>
//         <Text
//           style={{ fontSize: 14, color: "white", marginTop: 8, opacity: 0.9 }}
//         >
//           Find the person with the same color & code.
//         </Text>
//       </SafeAreaView>
//     );
//   }

//   // List peers
//   return (
//     <SafeAreaView style={{ flex: 1, padding: 16 }}>
//       <Text style={{ fontSize: 20, fontWeight: "700" }}>
//         Peers in cell:demo
//       </Text>
//       <FlatList
//         style={{ marginTop: 12 }}
//         data={peers}
//         keyExtractor={(p) => p.id}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               padding: 12,
//               borderWidth: 1,
//               borderRadius: 12,
//               marginBottom: 12,
//             }}
//           >
//             <Text style={{ fontWeight: "600" }}>{item.name}</Text>
//             <Text style={{ opacity: 0.7 }}>{item.id}</Text>
//             <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
//               <TouchableOpacity
//                 onPress={() => sendAccept(item.id)}
//                 style={{
//                   padding: 10,
//                   backgroundColor: "#4D96FF",
//                   borderRadius: 8,
//                 }}
//               >
//                 <Text style={{ color: "white" }}>Accept</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   padding: 10,
//                   backgroundColor: "#eee",
//                   borderRadius: 8,
//                 }}
//               >
//                 <Text>Pass</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={
//           <Text style={{ marginTop: 16, opacity: 0.7 }}>
//             No one else here yet.
//           </Text>
//         }
//       />
//     </SafeAreaView>
//   );
// }
//--------------------------------------------------------------------------------------------------
// CODE AFTER TUTORIAL
// The basic starting point I think
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Welcome to Proximity App</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
//=================================================================
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
