import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Defina as rotas do seu stack
type RootStackParamList = {
  CountdownScreen: undefined;
  ChatScreen: undefined;
  // outras telas...
};

// Especifique o tipo do navigation para incluir replace, push, etc.
type CountdownScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CountdownScreen'
>;

export default function CronometroInicioEvento() {
  const navigation = useNavigation<CountdownScreenNavigationProp>();
  const [timeLeft, setTimeLeft] = useState<number>(900);

  useEffect(() => {
    if (timeLeft === 0) {
      navigation.replace('ChatScreen'); // agora funciona
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigation]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>O Evento começará em breve</Text>
      <Text style={styles.timer}>
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  timer: { fontSize: 48, fontWeight: 'bold', color: '#1e90ff' },
});
