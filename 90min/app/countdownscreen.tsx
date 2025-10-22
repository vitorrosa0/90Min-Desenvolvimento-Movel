import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/scripts/styles/theme";

export default function CronometroInicioEvento() {
  // ⏱ Tempo inicial (10 segundos para teste, pode ajustar para 900 = 15min)
  const [timeLeft, setTimeLeft] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft === 0) {
      router.replace("/aovivo"); // redireciona para a tela de transmissão ao vivo
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏳ O evento começará em breve</Text>
      <Text style={styles.timer}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
      <Text style={styles.subtext}>Prepare-se para entrar no chat ao vivo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  timer: {
    color: colors.primary, 
    fontSize: 48,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtext: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
});
