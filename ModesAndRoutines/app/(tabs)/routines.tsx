import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Title, Button, IconButton, Avatar, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Plus } from "lucide-react-native";

const ROUTINE_STORAGE_KEY = 'routines';

const RoutineItem = ({ routine, onDelete, onEdit }) => {
  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Title
        title={routine.name}
        left={(props) => <Avatar.Icon {...props} icon="robot" />}
        right={(props) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton {...props} icon="pencil" onPress={onEdit} />
            <IconButton {...props} icon="delete" onPress={onDelete} />
          </View>
        )}
      />
      <Card.Content>
        <Title>Triggers</Title>
        <Text>
          {routine.triggers && routine.triggers.length > 0
            ? routine.triggers.map((trigger) => trigger.type).join(', ')
            : 'No triggers defined'}
        </Text>
        <Title>Actions</Title>
        <Text>
          {routine.actions && routine.actions.length > 0
            ? routine.actions.map((action) => action.type).join(', ')
            : 'No actions defined'}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default function RoutinesScreen() {
  const [routines, setRoutines] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      const storedRoutines = await AsyncStorage.getItem(ROUTINE_STORAGE_KEY);
      if (storedRoutines) {
        setRoutines(JSON.parse(storedRoutines));
      }
    } catch (error) {
      console.error('Failed to load routines:', error);
      Alert.alert('Error', 'Failed to load routines.');
    }
  };

  const saveRoutines = async (newRoutines) => {
    try {
      await AsyncStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(newRoutines));
      setRoutines(newRoutines);
    } catch (error) {
      console.error('Failed to save routines:', error);
      Alert.alert('Error', 'Failed to save routines.');
    }
  };

  const handleAddRoutine = () => {
    router.push('/new-routine');
  };

  const handleDeleteRoutine = (routineToDelete) => {
    Alert.alert(
      'Delete Routine',
      `Are you sure you want to delete ${routineToDelete.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const updatedRoutines = routines.filter((routine) => routine.id !== routineToDelete.id);
            saveRoutines(updatedRoutines);
          },
        },
      ]
    );
  };

  const handleEditRoutine = (routineToEdit) => {
    router.push({
      pathname: '/edit-routine',
      params: { routine: JSON.stringify(routineToEdit) },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Title style={[styles.headerTitle, { color: colors.text }]}>Manage Routines</Title>
        <Button icon={() => <Plus color={colors.onPrimary} />} mode="contained" onPress={handleAddRoutine} style={styles.addButton}>
          Add Routine
        </Button>
      </View>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoutineItem
            routine={item}
            onDelete={() => handleDeleteRoutine(item)}
            onEdit={() => handleEditRoutine(item)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
  },
  addButton: {
    marginTop: 0,
  },
  list: {
    flex: 1,
    paddingHorizontal: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    margin: 8,
    elevation: 2,
  },
});
