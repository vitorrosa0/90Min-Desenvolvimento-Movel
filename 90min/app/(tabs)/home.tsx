import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleScanQRCode = () => {
    console.log("Abrir câmera para escanear QRCode");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏟 StadiumChat</Text>

      <TouchableOpacity style={styles.scanButton} onPress={handleScanQRCode}>
        <Text style={styles.scanText}>📷 Escanear QRCode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff" 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#333",
  },
  scanButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  scanText: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "600", 
    textAlign: "center" 
  },
});
