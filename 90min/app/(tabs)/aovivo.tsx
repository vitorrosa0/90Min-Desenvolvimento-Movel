import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { gerarMensagensMock } from '../mockMessages';
import { useLocalSearchParams } from 'expo-router';
import { auth, db } from "@/scripts/databases/firebase";
import { collection, addDoc } from "firebase/firestore";

const MOCK_MENSAGENS_INICIAIS = gerarMensagensMock(100);

type Mensagem = {
  id: string;
  autor: string;
  texto: string;
};

export default function ChatAoVivo() {
  const { eventId, eventName } = useLocalSearchParams();

  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [mensagem, setMensagem] = useState('');

  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const dispararMensagensGradualmente = () => {
    if (indexRef.current >= MOCK_MENSAGENS_INICIAIS.length) return;

    setMensagens(prev => [...prev, MOCK_MENSAGENS_INICIAIS[indexRef.current]]);
    indexRef.current++;

    const delay = Math.floor(Math.random() * 3000) + 2000;

    timerRef.current = setTimeout(dispararMensagensGradualmente, delay);
  };

  useEffect(() => {
    dispararMensagensGradualmente();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const enviarMensagem = async () => {
    if (mensagem.trim().length === 0) return;

    const novaMensagem: Mensagem = {
      id: Date.now().toString(),
      autor: "Você",
      texto: mensagem,
    };

    setMensagens(prev => [...prev, novaMensagem]);
    setMensagem('');

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    await addDoc(collection(db, "messages"), {
      userId,
      eventId,
      lastMessage: mensagem,
      sentAt: new Date(),
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#121212' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ padding: 16, backgroundColor: '#1f1f1f', borderBottomWidth: 1, borderBottomColor: '#333' }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          📡 {eventName}
        </Text>
      </View>

      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.autor === 'Você' ? 'flex-end' : 'flex-start',
              backgroundColor: item.autor === 'Você' ? '#007bff' : '#333',
              margin: 8,
              padding: 10,
              borderRadius: 8,
              maxWidth: '80%',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.autor}</Text>
            <Text style={{ color: '#fff' }}>{item.texto}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 10, flexGrow: 1 }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          borderTopWidth: 1,
          borderTopColor: '#333',
          backgroundColor: '#1f1f1f',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#2a2a2a',
            color: '#fff',
            borderRadius: 8,
            padding: 10,
            marginRight: 8,
          }}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#aaa"
          value={mensagem}
          onChangeText={setMensagem}
        />

        <TouchableOpacity
          onPress={enviarMensagem}
          style={{
            backgroundColor: '#007bff',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
