import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaskedTextInput } from 'react-native-mask-text';
import Toast from 'react-native-toast-message';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/scripts/databases/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Storage from '@/scripts/utils/storage';

import { theme, colors } from '@/scripts/styles/theme';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const router = useRouter();
  const storage = new Storage();

  const calcularIdade = (data: string) => {
    const [dia, mes, ano] = data.split('/');
    const nascimento = new Date(`${ano}-${mes}-${dia}`);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;

    return idade;
  };

  const handleCadastro = async () => {
    if (!nome || !username || !dataNascimento || !email || !senha || !confirmarSenha) {
      return Toast.show({
        type: 'error',
        text1: 'Campos incompletos!',
        text2: 'Preencha todos os campos antes de prosseguir.',
      });
    }

    const idade = calcularIdade(dataNascimento);
    if (idade < 18) {
      return Toast.show({
        type: 'error',
        text1: 'Idade insuficiente!',
        text2: 'Você precisa ter pelo menos 18 anos para se cadastrar.',
      });
    }

        if (senha.length < 6) {
      return Toast.show({
        type: 'error',
        text1: 'Senha muito curta!',
        text2: 'A senha deve ter pelo menos 6 caracteres.',
      });
    }
    
    if (senha !== confirmarSenha) {
      return Toast.show({
        type: 'error',
        text1: 'Senhas não conferem!',
        text2: 'Digite a mesma senha nos dois campos.',
      });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nome,
        username,
        dataNascimento,
        email,
        createdAt: new Date().toISOString(),
      });

      await storage.saveContent('users', {
        uid: user.uid,
        nome,
        username,
        dataNascimento,
        email,
        createdAt: new Date().toISOString(),
      });

      Toast.show({
        type: 'success',  
        text1: 'Conta criada!',
        text2: 'Você já pode fazer login.',
      });

      setTimeout(() => {
        router.replace('/login');
      }, 1200);

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro no cadastro',
        text2: error.message,
      });
    }
  };

  return (
    <View style={[theme.screen, { justifyContent: 'center', paddingVertical: 40 }]}>
      <Text style={[theme.title, { textAlign: 'center' }]}>
        Crie sua conta para começar a aproveitar todos os recursos do nosso app!
      </Text>

      <MaskedTextInput
        style={[theme.input, { borderColor: colors.primary }]}
        placeholder="Nome completo"
        placeholderTextColor={colors.textSecondary}
        value={nome}
        onChangeText={setNome}
      />

      <MaskedTextInput
        mask="99/99/9999"
        style={[theme.input, { borderColor: colors.primary }]}
        placeholder="Data de Nascimento"
        placeholderTextColor={colors.textSecondary}
        value={dataNascimento}
        onChangeText={setDataNascimento}
        keyboardType="numeric"
      />

      <MaskedTextInput
        style={[theme.input, { borderColor: colors.primary }]}
        placeholder="Username"
        placeholderTextColor={colors.textSecondary}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[theme.input, { borderColor: colors.primary }]}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[theme.input, { borderColor: colors.primary }]}
        placeholder="Senha"
        placeholderTextColor={colors.textSecondary}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={[theme.input, { borderColor: colors.primary }]}
        placeholder="Confirme a Senha"
        placeholderTextColor={colors.textSecondary}
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity style={theme.button} onPress={handleCadastro}>
        <Text style={theme.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={theme.linkText}>Já tem conta? Faça seu login</Text>
      </TouchableOpacity>
    </View>
  );
}
