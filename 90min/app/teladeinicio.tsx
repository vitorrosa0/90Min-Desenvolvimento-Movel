import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../scripts/styles/theme'; // importando as cores separadas

export default function TelaDeInicio() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacidade inicial: 0

  useEffect(() => {
    // Sequência: Fade in -> delay -> Fade out
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1, // aparece
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500), // permanece visível
      Animated.timing(fadeAnim, {
        toValue: 0, // some
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/login'); // redireciona para login
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/icon.png')} // logo do app
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // usando cor do tema
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    tintColor: colors.primary, // verde neon ou cor primária do tema
  },
});
