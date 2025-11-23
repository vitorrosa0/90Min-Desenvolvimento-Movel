import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { colors, theme } from '@/scripts/styles/theme';
import { auth, db } from "@/scripts/databases/firebase";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { signOut } from 'firebase/auth';

interface Evento {
  id: string;
  eventName: string;
}

export default function PerfilScreen() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);

  const [mensagens, setMensagens] = useState<string[]>([]);
  const [unsubscribeMsgs, setUnsubscribeMsgs] = useState<null | (() => void)>(null);

  const carregarUsuario = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setNome(data.nome || "");
        setUserName(data.username || "");
        setEmail(data.email || "");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();
    }, [])
  );

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, "users", user.uid, "events");

    return onSnapshot(ref, (snapshot) => {
      const evts: Evento[] = [];
      snapshot.forEach((doc) => {
        evts.push({
          id: doc.id,
          eventName: doc.data().eventName,
        });
      });
      setEventos(evts);
    });
  }, []);

  const carregarMensagensDoEvento = async (eventId: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    setEventoSelecionado(eventId);
    setMensagens([]);

    if (unsubscribeMsgs) unsubscribeMsgs();

    const ref = collection(db, "messages");

    const q = query(
      ref,
      where("eventId", "==", eventId),
      where("userId", "==", userId)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs: string[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data?.lastMessage) msgs.push(data.lastMessage);
      });

      setMensagens(msgs);
    });

    setUnsubscribeMsgs(() => unsub);
  };

  useEffect(() => {
    return () => {
      if (unsubscribeMsgs) unsubscribeMsgs();
    };
  }, [unsubscribeMsgs]);

  const handleLogout = async () => {
    try {
      if (unsubscribeMsgs) unsubscribeMsgs();
      await signOut(auth);

      router.replace('/login');
      setTimeout(() => router.push('/login'), 200);

    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível sair.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon-perfil.png')} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.nomeContainer}>
            <Text style={styles.nome}>{userName || nome || 'Carregando...'}</Text>

            <TouchableOpacity onPress={() => router.push('/editar-perfil')} activeOpacity={0.7}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} activeOpacity={0.7} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.detail}>Nome: {nome} </Text>
            <Text style={styles.detail}> Email: {email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />
      <Text style={styles.sectionTitle}>Eventos Recentes</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => carregarMensagensDoEvento(item.id)}
          >
            <Text style={styles.cardText}>{item.eventName}</Text>

            {eventoSelecionado === item.id && (
              <View style={{ marginTop: 10 }}>
                {mensagens.length === 0 ? (
                  <Text style={{ color: colors.textSecondary }}>
                    Você não interagiu nesse chat ainda.
                  </Text>
                ) : (
                  mensagens.map((m, index) => (
                    <Text key={index} style={{ color: colors.textPrimary }}>
                      • {m}
                    </Text>
                  ))
                )}
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...theme.screen },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userInfo: { flex: 1 },
  nomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  nome: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 8,
    flex: 1,
  },
  editIcon: {
    fontSize: 16,
    marginLeft: 4,
  },
  logoutButton: {
    marginLeft: 8,
  },
  logoutText: {
    fontSize: 12,
    color: colors.textSecondary,
    opacity: 0.8,
  },
  row: { flexDirection: "row", flexWrap: "wrap" },
  detail: { color: colors.textSecondary, fontSize: 14 },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 10,
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
});
