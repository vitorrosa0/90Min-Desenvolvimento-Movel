import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0A0A0A',
  surface: '#1C1C1E',
  textPrimary: '#F1F1F1',
  textSecondary: '#A1A1AA',
  primary: '#0077FF',
  success: '#00FF88',
  error: '#FF3B30',
  border: '#2C2C2E',
};

export const theme = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

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

  linkText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
  },
});
