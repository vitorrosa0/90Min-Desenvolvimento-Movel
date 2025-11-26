import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../scripts/styles/theme';

export default function TelaDeInicio() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1500), 
      Animated.timing(fadeAnim, {
        toValue: 0, 
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/login'); 
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/icon.png')} 
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    tintColor: colors.background,
  },
});
