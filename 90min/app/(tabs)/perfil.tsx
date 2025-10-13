import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { colors, theme } from '@/scripts/styles/theme';

const usuario = {
  nome: "Nome do Usuário",
  foto: "https://pt.pngtree.com/freepng/avatar-icon-profile-icon-member-login-vector-isolated_5247852.html",
  eventos: [
    { id: '1', jogo: "Flamengo x Vasco" },
    { id: '2', jogo: "Palmeiras x São Paulo" },
    { id: '3', jogo: "Corinthians x Santos" },
  ]
};

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon-perfil.png')} style={styles.avatar} />
        <Text style={styles.nome}>{usuario.nome}</Text>
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
    marginBottom: 20,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  nome: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
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
