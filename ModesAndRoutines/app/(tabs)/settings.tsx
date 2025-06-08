import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.text }]}>Settings</Title>
      <Text style={[styles.text, { color: colors.text }]}>
        Here you can configure app settings.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
});
