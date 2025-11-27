import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '@/scripts/databases/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { theme, colors } from '@/scripts/styles/theme';
import Storage from '@/scripts/utils/storage';

export default function EditarPerfil() {
  const router = useRouter();
  const storage = new Storage();
  
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      try {
        const currentUser = auth.currentUser;
        
        if (currentUser) {
          try {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);
            
            if (userSnap.exists()) {
              const userData = userSnap.data();
              setNome(userData.nome || '');
              setUsername(userData.username || '');
              
              await storage.saveContent('user', {
                uid: currentUser.uid,
                nome: userData.nome || '',
                username: userData.username || '',
                email: userData.email || currentUser.email || '',
              });
              
              setCarregando(false);
              return;
            }
          } catch (firestoreError) {
            console.warn("Erro ao buscar do Firestore, tentando AsyncStorage:", firestoreError);
          }
        }
        
        const user = await storage.getContent("user");
        if (user) {
          setNome(user.nome || '');
          setUsername(user.username || '');
        }
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
        setCarregando(false);
      }
    };

    carregarDadosUsuario();
  }, []);

  const handleSalvar = async () => {
    if (!nome.trim() || !username.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado. Faça login novamente.');
        router.replace('/login');
        return;
      }

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        nome: nome.trim(),
        username: username.trim(),
        updatedAt: new Date().toISOString(),
      });

      const userData = await storage.getContent("user");
      await storage.saveContent('user', {
        ...userData,
        nome: nome.trim(),
        username: username.trim(),
        updatedAt: new Date().toISOString(),
      });

      console.log("Dados atualizados com sucesso no Firestore e AsyncStorage!");
      
      setLoading(false);
      router.push('/(tabs)/perfil');
    } catch (error: any) {
      console.error("Erro ao salvar alterações:", error);
      Alert.alert('Erro', error.message || 'Não foi possível salvar as alterações.');
      setLoading(false);
    }
  };

  if (carregando) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.subtitle}>Atualize suas informações pessoais</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={[theme.input, { borderColor: colors.primary }]}
            placeholder="Digite seu nome completo"
            placeholderTextColor={colors.textSecondary}
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome de Usuário</Text>
          <TextInput
            style={[theme.input, { borderColor: colors.primary }]}
            placeholder="Digite seu nome de usuário"
            placeholderTextColor={colors.textSecondary}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[theme.button, loading && styles.buttonDisabled]}
          onPress={handleSalvar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.textPrimary} />
          ) : (
            <Text style={theme.buttonText}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push('/(tabs)/perfil')}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...theme.screen,
    justifyContent: 'flex-start',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    ...theme.title,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttons: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
});

