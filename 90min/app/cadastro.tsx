// app/cadastro.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaskedTextInput } from 'react-native-mask-text';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/scripts/databases/firebase';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [username, setUsername] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const router = useRouter();

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
  console.log("➡️ Iniciando cadastro...");
  console.log("Dados informados:", {
    nome,
    sobrenome,
    username,
    dataNascimento,
    email,
    senha,
    confirmarSenha,
  });

  if (!nome || !sobrenome || !username || !dataNascimento || !email || !senha || !confirmarSenha) {
    Alert.alert('Erro', 'Preencha todos os campos!');
    console.log("❌ Campos obrigatórios faltando");
    return;
  }

  const idade = calcularIdade(dataNascimento);
  console.log("📅 Idade calculada:", idade);

  if (idade < 18) {
    Alert.alert('Erro', 'Você precisa ter pelo menos 18 anos para se cadastrar.');
    console.log("❌ Usuário menor de 18 anos");
    return;
  }

  if (senha !== confirmarSenha) {
    Alert.alert('Erro', 'As senhas não conferem!');
    console.log("❌ Senhas não conferem");
    return;
  }

  try {
    console.log("🔥 Chamando createUserWithEmailAndPassword...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;
    console.log("✅ Usuário criado no Firebase:", user);

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    router.replace('/login');
  } catch (error: any) {
    console.error("❌ Erro no Firebase Auth:", error);
    Alert.alert('Erro no cadastro', error.message);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <MaskedTextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <MaskedTextInput style={styles.input} placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
      <MaskedTextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <MaskedTextInput
        mask="99/99/9999"
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/YYYY)"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirme a Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
