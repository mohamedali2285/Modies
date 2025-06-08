import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';

const ROUTINE_STORAGE_KEY = 'routines';

export default function EditRoutineScreen() {
  const { routine: routineParam } = useLocalSearchParams();
  const routine = routineParam ? JSON.parse(routineParam) : null;

  const [routineName, setRoutineName] = useState(routine ? routine.name : '');
  const { colors } = useTheme();

  useEffect(() => {
    if (routine) {
      setRoutineName(routine.name);
    }
  }, [routine]);

  const handleSaveRoutine = async () => {
    if (!routineName.trim()) {
      Alert.alert('Error', 'Routine name is required.');
      return;
    }

    const updatedRoutine = {
      ...routine,
      name: routineName,
    };

    try {
      const storedRoutines = await AsyncStorage.getItem(ROUTINE_STORAGE_KEY);
      const existingRoutines = storedRoutines ? JSON.parse(storedRoutines) : [];
      const updatedRoutines = existingRoutines.map((r) => (r.id === routine.id ? updatedRoutine : r));
      await AsyncStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(updatedRoutines));
      router.back();
    } catch (error) {
      console.error('Failed to save routine:', error);
      Alert.alert('Error', 'Failed to save routine.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Title style={[styles.title, { color: colors.text }]}>Edit Routine</Title>
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
