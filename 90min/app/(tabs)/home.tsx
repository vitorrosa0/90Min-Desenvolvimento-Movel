import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { theme } from "@/scripts/styles/theme";

export default function HomeScreen() {
  const router = useRouter();

  const handleScanQRCode = () => {
    console.log("Abrir câmera para escanear QRCode");
  };

  return (
    <View style={theme.screen}>

      <TouchableOpacity style={theme.button} onPress={handleScanQRCode}>
        <Text style={theme.buttonText}>📷 Escanear QRCode</Text>
      </TouchableOpacity>
    </View>
  );
}


