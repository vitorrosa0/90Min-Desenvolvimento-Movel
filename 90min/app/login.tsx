import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../scripts/databases/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { theme, colors } from '../scripts/styles/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);

    if (!email || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.replace('/home');
    } catch (err: any) {
      let message = 'Erro no login, verifique suas credenciais';
      if (err.code === 'auth/invalid-email') {
        message = 'Usuário não encontrado. Você pode se cadastrar no link abaixo.';
      }
      setError(message);
    }
  };

  return (
    <View style={[theme.screen, { justifyContent: 'center', paddingVertical: 40 }]}>
      <View style={{ alignItems: 'center' }}>
        <Image 
          source={require('../assets/images/icon-removebg-preview.png')}
          style={{ width: 220, height: 220, resizeMode: 'contain' }}
        />
      </View>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        style={[theme.input, { borderColor: colors.primary }]}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        style={[theme.input, { borderColor: colors.primary }]}
        value={senha}
        onChangeText={setSenha}
      />

      {error && (
        <Text style={{ color: colors.error, textAlign: 'center', marginBottom: 10 }}>
          {error}
        </Text>
      )}

      <TouchableOpacity style={theme.button} onPress={handleLogin}>
        <Text style={theme.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/cadastro')}>
        <Text style={theme.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
