import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { router } from 'expo-router';

const MODE_STORAGE_KEY = 'modes';

export default function NewModeScreen() {
  const [modeName, setModeName] = useState('');
  const { colors } = useTheme();

  const handleSaveMode = async () => {
    if (!modeName.trim()) {
      Alert.alert('Error', 'Mode name is required.');
      return;
    }

    const newMode = {
      id: uuidv4(),
      name: modeName,
      actions: [],
    };

    try {
      const storedModes = await AsyncStorage.getItem(MODE_STORAGE_KEY);
      const existingModes = storedModes ? JSON.parse(storedModes) : [];
      const updatedModes = [...existingModes, newMode];
      await AsyncStorage.setItem(MODE_STORAGE_KEY, JSON.stringify(updatedModes));
      router.back();
    } catch (error) {
      console.error('Failed to save mode:', error);
      Alert.alert('Error', 'Failed to save mode.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.text }]}>New Mode</Title>
      <TextInput
        label="Mode Name"
        value={modeName}
        onChangeText={setModeName}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: colors.primary } }}
      />
      <Button mode="contained" onPress={handleSaveMode} style={styles.button}>
        Save Mode
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
