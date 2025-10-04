import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const usuario = {
  nome: "Fla Jovem",
  foto: "https://randomuser.me/api/portraits/men/32.jpg", 
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
        <Image source={{ uri: usuario.foto }} style={styles.avatar} />
        <Text style={styles.nome}>{usuario.nome}</Text>
      </View>

      <View style={styles.separator} />

      <FlatList
        data={usuario.eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>{item.jogo}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
