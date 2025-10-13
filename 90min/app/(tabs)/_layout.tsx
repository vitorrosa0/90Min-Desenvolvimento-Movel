import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/scripts/styles/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.background,
        tabBarActiveTintColor: colors.background,
        tabBarInactiveTintColor: colors.textPrimary,
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 60,
          margin: 0,
          paddingBottom: 5, 
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="futbol" size={size - 2} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="aovivo"
        options={{
          title: 'Ao Vivo',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="radio-outline" size={size - 2} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
