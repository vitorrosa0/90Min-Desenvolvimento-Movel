import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { theme, colors } from "@/scripts/styles/theme";

export default function HomeScreen() {
  const router = useRouter();

  const handleScanQRCode = () => {
    console.log("📷 Abrir câmera para escanear QRCode");
  };

  // 🔹 Lista de jogos fictícia (pode vir do backend futuramente)
  const outrosJogos = [
    { id: "1", jogo: "Flamengo x Vasco", horario: "18:00" },
    { id: "2", jogo: "Palmeiras x São Paulo", horario: "20:00" },
    { id: "3", jogo: "Corinthians x Santos", horario: "21:30" },
  ];

  return (
    <View style={[theme.screen, { justifyContent: "flex-start" }]}>
      {/* Botão principal de QRCode */}
      

      {/* Seção 1: Chat da partida */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acesse o chat da sua partida</Text>
        <TouchableOpacity style={[theme.button, { marginVertical: 20 }]} onPress={handleScanQRCode}>
        <Text style={theme.buttonText}>📷 Escanear QRCode</Text>
      </TouchableOpacity>
      </View>

      {/* Seção 2: Outros jogos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Outros jogos</Text>

        <FlatList
          data={outrosJogos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={handleScanQRCode}
            >
              <Text style={styles.cardText}>{item.jogo}</Text>
              <Text style={styles.cardSubtext}>⏰ {item.horario}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: colors.primary,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  cardText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
  cardSubtext: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
});
