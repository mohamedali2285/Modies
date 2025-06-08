import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { router } from 'expo-router';

const ROUTINE_STORAGE_KEY = 'routines';

export default function NewRoutineScreen() {
  const [routineName, setRoutineName] = useState('');
  const { colors } = useTheme();

  const handleSaveRoutine = async () => {
    if (!routineName.trim()) {
      Alert.alert('Error', 'Routine name is required.');
      return;
    }

    const newRoutine = {
      id: uuidv4(),
      name: routineName,
      triggers: [],
      actions: [],
    };

    try {
      const storedRoutines = await AsyncStorage.getItem(ROUTINE_STORAGE_KEY);
      const existingRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
      const updatedRoutines = [...existingRoutines, newRoutine];
      await AsyncStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(updatedRoutines));
      router.back();
    } catch (error) {
      console.error('Failed to save routine:', error);
      Alert.alert('Error', 'Failed to save routine.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.text }]}>New Routine</Title>
      <TextInput
        label="Routine Name"
        value={routineName}
        onChangeText={setRoutineName}
        mode="outlined"
        style={styles.input}
        theme={{ colors: { primary: colors.primary } }}
      />
      <Button mode="contained" onPress={handleSaveRoutine} style={styles.button}>
        Save Routine
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
