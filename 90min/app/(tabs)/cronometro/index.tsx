import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors } from "@/scripts/styles/theme";
import { auth, db } from "@/scripts/databases/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CronometroInicioEvento() {
  const { eventId, eventName } = useLocalSearchParams();
  const [timeLeft, setTimeLeft] = useState(10);
  const router = useRouter();

  async function registrarEntradaNoEvento() {
    const userId = auth.currentUser?.uid;
    if (!userId || !eventId || !eventName) return;

    await addDoc(collection(db, "events"), {
      userId,
      eventId,
      eventName,
      joinedAt: new Date(),
    });
  }

  useEffect(() => {
    if (!eventId || !eventName) return;

    setTimeLeft(10);
    registrarEntradaNoEvento();
  }, [eventId, eventName]);

  useEffect(() => {
    if (timeLeft === 0) {
      router.replace({
        pathname: "/aovivo",
        params: { eventId, eventName },
      });
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏳ O evento começará em breve</Text>
      <Text style={styles.timer}>
        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
        {String(timeLeft % 60).padStart(2, "0")}
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
