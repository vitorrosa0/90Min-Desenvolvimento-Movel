import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaskedTextInput } from 'react-native-mask-text';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/scripts/databases/firebase';
import { theme, colors } from '@/scripts/styles/theme';
import { doc, setDoc } from 'firebase/firestore';
import Storage from '@/scripts/utils/storage';

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
    console.log("➡️ Iniciando cadastro...", { nome, username, dataNascimento, email, senha, confirmarSenha });

    if (!nome || !username || !dataNascimento || !email || !senha || !confirmarSenha) {
      console.log("Preencha todos os campos!")
      return;
    }

    const idade = calcularIdade(dataNascimento);
    if (idade < 18) {
      console.log("Preencha todos os campos!")
      Alert.alert('Erro', 'Você precisa ter pelo menos 18 anos para se cadastrar.');
      return;
    }

    if (senha !== confirmarSenha) {
      console.log("Preencha todos os campos!")
      Alert.alert('Erro', 'As senhas não conferem!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("✅ Usuário criado no Firebase:", user.uid);
      // await setDoc(doc(db, "users", user.uid), {
      //   nome,
      //   username,
      //   dataNascimento,
      //   email,
      //   createdAt: new Date(),
      // });

      await storage.saveContent('user', {
        uid: user.uid,
        nome,
        username,
        dataNascimento,
        email,
        createdAt: new Date().toISOString(),
      });

      console.log("💾 Dados do usuário salvos localmente!");
      const userlog = await storage.getContent('user')
      console.log(userlog)

      router.replace('/login');
    } catch (error: any) {
      console.error("❌ Erro no Firebase Auth:", error);
      Alert.alert('Erro no cadastro', error.message);
    }
  };

  return (
    <View style={[theme.screen, { justifyContent: 'center', paddingVertical: 40 }]}>
      <Text style={[theme.title, { textAlign: 'center' }]}>Crie sua conta para começar a aproveitar todos os recursos do nosso app! </Text>
      <Text style={[theme.title, { textAlign: 'center' }]}>É rápido, seguro e você terá acesso personalizado ao conteúdo.</Text>

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
