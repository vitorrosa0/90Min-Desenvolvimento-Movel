import React from 'react';
import { View, Text } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import { colors } from '../scripts/styles/theme';

type CustomToastProps = BaseToastProps & {
  type?: 'success' | 'error' | 'info';
  text1?: string;
  text2?: string;
};

export const CustomToast = (props: CustomToastProps) => {
  const borderColor =
    props.type === 'success'
      ? colors.success
      : props.type === 'error'
      ? colors.error
      : colors.primary;

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        padding: 14,
        borderRadius: 10,
        borderLeftWidth: 6,
        borderLeftColor: borderColor,
        marginHorizontal: 10,
      }}
    >
      {props.text1 && (
        <Text
          style={{
            color: colors.textPrimary,
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {props.text1}
        </Text>
      )}

      {props.text2 && (
        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 4,
            fontSize: 14,
          }}
        >
          {props.text2}
        </Text>
      )}
    </View>
  );
};

export default CustomToast;
