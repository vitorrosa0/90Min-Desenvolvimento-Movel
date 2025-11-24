// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { useRouter } from "expo-router";
// import { colors } from "@/scripts/styles/theme";

// export default function ScanScreen() {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [scanned, setScanned] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }: any) => {
//     if (scanned) return;
//     setScanned(true);

//     console.log("QR LIDO:", data);

//     router.replace("/countdownscreen");
//   };

//   if (hasPermission === null) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: colors.textPrimary }}>Solicitando permissão...</Text>
//       </View>
//     );
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: colors.textPrimary }}>Permissão negada.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={{ flex: 1 }}
//       />

//       <View style={styles.overlay}>
//         <Text style={styles.instruction}>Aponte para o QRCode</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     backgroundColor: colors.background,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   overlay: {
//     position: "absolute",
//     bottom: 60,
//     alignSelf: "center",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: "#00000080",
//     borderRadius: 8,
//   },
//   instruction: {
//     color: colors.textPrimary,
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
