import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define os nomes e parâmetros das rotas do Stack
type RootStackParamList = {
  ChatScreen: undefined;
  // adicione outras telas aqui se precisar
};

export default function CronometroInicioEvento() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [timeLeft, setTimeLeft] = useState<number>(900); // 900s = 15min

  useEffect(() => {
    if (timeLeft === 0) {
      navigation.replace('ChatScreen');
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
});
