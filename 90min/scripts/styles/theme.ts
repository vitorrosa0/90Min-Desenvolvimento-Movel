// scripts/styles/theme.ts
import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0A0A0A',        // Fundo principal (preto profundo)
  surface: '#1C1C1E',           // Cartões / caixas
  textPrimary: '#F1F1F1',       // Texto principal
  textSecondary: '#A1A1AA',     // Texto secundário / placeholder
  primary: '#0077FF',           // Azul esporte (botões e destaques)
  success: '#00FF88',           // Verde neon (sucesso)
  error: '#FF3B30',             // Vermelho alerta
  border: '#2C2C2E',            // Borda sutil
};

export const theme = StyleSheet.create({
  // 🌑 Tela base
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  // ✍️ Texto principal
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  // 🧾 Input padrão
  input: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  inputPlaceholder: {
    color: colors.textSecondary,
  },

  // 🔘 Botão padrão
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // 📎 Link de navegação
  linkText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
  },
});
