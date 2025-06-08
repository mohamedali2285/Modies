import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';

const MODE_STORAGE_KEY = 'modes';

export default function EditModeScreen() {
  const { mode: modeParam } = useLocalSearchParams();
  const mode = modeParam ? JSON.parse(modeParam) : null;

  const [modeName, setModeName] = useState(mode ? mode.name : '');
  const { colors } = useTheme();

  useEffect(() => {
    if (mode) {
      setModeName(mode.name);
    }
  }, [mode]);

  const handleSaveMode = async () => {
    if (!modeName.trim()) {
      Alert.alert('Error', 'Mode name is required.');
      return;
    }

    const updatedMode = {
      ...mode,
      name: modeName,
    };

    try {
      const storedModes = await AsyncStorage.getItem(MODE_STORAGE_KEY);
      const existingModes = storedModes ? JSON.parse(storedModes) : [];
      const updatedModes = existingModes.map((m) => (m.id === mode.id ? updatedMode : m));
      await AsyncStorage.setItem(MODE_STORAGE_KEY, JSON.stringify(updatedModes));
      router.back();
    } catch (error) {
      console.error('Failed to save mode:', error);
      Alert.alert('Error', 'Failed to save mode.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.text }]}>Edit Mode</Title>
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
