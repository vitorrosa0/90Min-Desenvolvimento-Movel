import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors, theme } from '@/scripts/styles/theme';
import Storage from '@/scripts/utils/storage';
import StorageFirebase from '../../scripts/databases/storageFirebase';
import { auth, db } from "@/scripts/databases/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const storageFirebase = new StorageFirebase();

interface Content {
  email: string;
  nome: string;
}

interface Evento {
  id: string;
  eventName: string;
}

export default function PerfilScreen() {
  const storage = new Storage();
  const [contents, setContents] = useState<Content[]>([]);
  const [nome, setNome] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);

  const [mensagens, setMensagens] = useState<string[]>([]);
  const [unsubscribeMsgs, setUnsubscribeMsgs] = useState<null | (() => void)>(null);

  useEffect(() => {
    storageFirebase.listContents(setContents);
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, "user", user.uid, "events");

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

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const user = await storage.getContent("user");
        if (user?.nome) setNome(user.nome);
        if (user?.username) setUserName(user.username);
        if (user?.email) setEmail(user.email);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    carregarUsuario();
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon-perfil.png')} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.nome}>{nome}</Text>

          <View style={styles.row}>
            <Text style={styles.detail}>Usuário: {userName}</Text>
            <Text style={styles.detail}>  •  Email: {email}</Text>
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
  nome: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
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
