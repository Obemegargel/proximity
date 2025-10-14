// import { useState } from "react";
// import { View, Text, Button, Alert } from "react-native";

// export default function App() {
//   const [discovering, setDiscovering] = useState(false);
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 12,
//       }}
//     >
//       <Text style={{ fontSize: 20, fontWeight: "600" }}>
//         Ghost mode: ON (default)
//       </Text>
//       <Button
//         title={discovering ? "Discovering…" : "Discover"}
//         onPress={async () => {
//           setDiscovering(true);
//           await new Promise((r) => setTimeout(r, 1500));
//           Alert.alert("Nudge: someone nearby");
//           setDiscovering(false);
//         }}
//       />
//     </View>
//   );
// }
import React, { useEffect, useMemo, useRef, useState } from "react"; // brings React plus common hooks. a hook = a function that lets you "hook into" React features such as stat, lifecycle, refs, and (maybe memoization). a common hook is generally termed when refering to built-in hooks that people use all the time. Q: is memoization a React feature and is it accessible via a hook?
import { Platform, View, Text, Button, FlatList, Alert } from "react-native"; // pulls RN primatives, cross-platform OS info, and UI components Q: what are RN primatives?
import { BleManager, Device } from "react-native-ble-plx"; // the BLE library core classes. (NOTE: Device is imported but not directly used).
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  type Permission,
} from "react-native-permissions"; // permission imports give me runtime permission APIs on Android, Permission is a type for the permission constants I'll request.

type Seen = { id: string; name: string | null; rssi: number | null }; // a minimal shape for devices discovered via BLE advertising.

// Here is the main app component
export default function App() {
  const managerRef = useRef<BleManager | null>(null); // BleManager is a class that handles all Bluetooth Low Energy operations. it lives across renders. it is set to null when empty. managerRef is a variable that represents this class. Much like naming a specific list or array except instead of type list it is type BleManager.
  const [scanning, setScanning] = useState(false); // scanning is a variable that tracks if a scan is ongoing or not.
  const [devices, setDevices] = useState<Record<string, Seen>>({}); // devices is a dictionary of Seen devices, keyed by device ID.

  // create/destroy the BLE manager once
  useEffect(() => {
    const m = new BleManager();
    managerRef.current = m;
    return () => {
      m.destroy();
      managerRef.current = null;
    };
  }, []);

  const list = useMemo(
    () =>
      Object.values(devices).sort(
        (a, b) => (b.rssi ?? -999) - (a.rssi ?? -999)
      ),
    [devices]
  );

  // ask runtime permissions as needed
  async function ensurePermissions() {
    if (Platform.OS !== "android") return true;

    // Use Permission[] so request(p) is correctly typed
    const wants: Permission[] = [
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    ];

    // Android API < 31 (Android 12) may still require Fine Location for scans
    const apiLevel = Number(Platform.Version); // e.g. 30, 31, 34
    if (apiLevel < 31) {
      wants.push(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    for (const p of wants) {
      const res = await request(p);
      if (!(res === RESULTS.GRANTED || res === RESULTS.LIMITED)) {
        Alert.alert(
          "Permission needed",
          "Bluetooth permission is required for scanning.",
          [
            { text: "Open settings", onPress: () => openSettings() },
            { text: "OK" },
          ]
        );
        return false;
      }
    }
    return true;
  }

  function startScan() {
    const manager = managerRef.current;
    if (!manager) return;

    setDevices({});
    setScanning(true);

    manager.startDeviceScan(
      null, // all advertisements
      { allowDuplicates: false },
      (error, device) => {
        if (error) {
          setScanning(false);
          Alert.alert("Scan error", String(error.message ?? error));
          return;
        }
        if (!device) return;

        setDevices((prev) => {
          if (prev[device.id]) return prev;
          return {
            ...prev,
            [device.id]: {
              id: device.id,
              name: device.name ?? device.localName ?? null,
              rssi: device.rssi ?? null,
            },
          };
        });
      }
    );

    // stop after ~20 seconds
    setTimeout(stopScan, 20000);
  }

  function stopScan() {
    const manager = managerRef.current;
    try {
      manager?.stopDeviceScan();
    } catch {}
    setScanning(false);
  }

  return (
    <View style={{ flex: 1, paddingTop: 64, paddingHorizontal: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
        Proximity (scan demo)
      </Text>
      <Text style={{ marginBottom: 16, opacity: 0.7 }}>
        Tap Discover to scan for ~20s and list nearby BLE advertisers.
      </Text>

      <Button
        title={scanning ? "Scanning…" : "Discover"}
        onPress={async () => {
          if (scanning) {
            stopScan();
            return;
          }
          const ok = await ensurePermissions();
          if (ok) startScan();
        }}
      />

      <Text style={{ marginTop: 16, fontWeight: "600" }}>
        {list.length
          ? `Found ${list.length} device(s):`
          : scanning
          ? "Scanning…"
          : "No devices yet."}
      </Text>

      <FlatList
        style={{ marginTop: 8 }}
        data={list}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          >
            <Text style={{ fontWeight: "600" }}>
              {item.name ?? "(no name)"}
            </Text>
            <Text style={{ fontSize: 12, opacity: 0.7 }}>
              {item.id} • RSSI {item.rssi ?? "?"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
