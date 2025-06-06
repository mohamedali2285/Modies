import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, StyleProp, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ 
  title, 
  onPress, 
  type = 'primary', 
  disabled = false,
  style,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  
  const getButtonStyle = () => {
    if (type === 'primary') {
      return {
        backgroundColor: Colors[colorScheme ?? 'light'].tint,
      };
    } else if (type === 'secondary') {
      return {
        backgroundColor: Colors[colorScheme ?? 'light'].subtleBg,
      };
    } else {
      return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors[colorScheme ?? 'light'].tint,
      };
    }
  };
  
  const getTextStyle = () => {
    if (type === 'primary') {
      return {
        color: '#FFFFFF',
      };
    } else if (type === 'secondary') {
      return {
        color: Colors[colorScheme ?? 'light'].text,
      };
    } else {
      return {
        color: Colors[colorScheme ?? 'light'].tint,
      };
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, getTextStyle()]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});