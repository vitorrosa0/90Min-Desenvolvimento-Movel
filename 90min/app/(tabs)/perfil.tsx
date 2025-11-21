import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors, theme } from '@/scripts/styles/theme';
import Storage from '@/scripts/utils/storage';
import StorageFirebase from '../../scripts/databases/storageFirebase'

const storageFirebase = new StorageFirebase();

const usuario = {
  nome: "Nome do Usuário",
  email: "usuario@email.com",
  eventos: [
    { id: '1', jogo: "Flamengo x Vasco" },
    { id: '2', jogo: "Palmeiras x São Paulo" },
    { id: '3', jogo: "Corinthians x Santos" },
  ]
};

interface Content {
  email: string;
  nome: string;
}

export default function PerfilScreen() {
  const storage = new Storage();
  const [contents, setContents] = useState<Content[]>([]);
  const [nome, setNome] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    storageFirebase.listContents(setContents)
  }, [])

  const renderContent = () => {
    return (
      contents.map((content, index) => {
        <>
          <Text style={styles.detail}> {content.email}</Text>
        </>
      })
    )
  }

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const user = await storage.getContent('user');
        console.log("🧠 Usuário recuperado do AsyncStorage:", user);
        if (user?.nome) setNome(user.nome);
        if (user?.username) setUserName(user.username);
        if (user?.email) setEmail(user.email);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    carregarUsuario();
  }, []);

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
        data={usuario.eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <Text style={styles.cardText}>{item.jogo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...theme.screen,
  },
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
  userInfo: {
    flex: 1,
  },
  nome: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detail: {
    color: colors.textSecondary,
    fontSize: 14,
  },
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
