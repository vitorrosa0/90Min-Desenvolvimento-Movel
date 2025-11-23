import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { theme, colors } from "@/scripts/styles/theme";

export default function HomeScreen() {
  const router = useRouter();
  const [jogos, setJogos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:3000/api/jogos";

  useEffect(() => {
    async function fetchJogos() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setJogos(data);
      } catch (err) {
        console.error("Erro ao buscar jogos", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJogos();
  }, []);

  const handleScanQRCode = () => {
    router.push("../cronometro");
  };

  if (loading) {
    return (
      <View style={[theme.screen, { justifyContent: "center" }]}>
        <Text style={{ color: colors.textPrimary, fontSize: 18 }}>
          Carregando jogos...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={theme.screen}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acesse o chat da sua partida</Text>
        <TouchableOpacity
          style={[theme.button, { marginVertical: 20 }]}
          onPress={handleScanQRCode}
        >
          <Text style={theme.buttonText}>📷 Escanear QRCode</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Outros jogos</Text>

        <FlatList
          data={jogos}
          scrollEnabled={false} // 👈 evita conflito com ScrollView
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const partida = item.jogo;
            const horario = new Date(item.horario)
              .toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(":", "h");

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "../cronometro",
                    params: {
                      eventId: item.id,
                      eventName: partida,
                    },
                  })
                }
              >
                <View style={styles.row}>
                  <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Text style={styles.cardText}>{partida}</Text>
                    <Text style={styles.cardSubtext}>{horario}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
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
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
