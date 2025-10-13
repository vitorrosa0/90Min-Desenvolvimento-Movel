import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { gerarMensagensMock } from '../mockMessages'; 

const MOCK_MENSAGENS_INICIAIS = gerarMensagensMock(100);

export default function ChatAoVivo() {
  const nomeEvento = "Flamengo x Vasco";
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState(MOCK_MENSAGENS_INICIAIS);  

  const enviarMensagem = () => {
    if (mensagem.trim().length === 0) return;

    const novaMensagem = {
      id: Date.now().toString(),
      autor: 'Você',
      texto: mensagem,
    };
    setMensagens([...mensagens, novaMensagem]);
    setMensagem('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#121212' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ padding: 16, backgroundColor: '#1f1f1f', borderBottomWidth: 1, borderBottomColor: '#333' }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          📡 {nomeEvento}
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
