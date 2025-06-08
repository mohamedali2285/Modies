import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Card, Title, Button, IconButton, Avatar, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Plus } from "lucide-react-native";

const MODE_STORAGE_KEY = 'modes';

const ModeItem = ({ mode, onDelete, onEdit }) => {
  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Title
        title={mode.name}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconButton {...props} icon="pencil" onPress={onEdit} />
            <IconButton {...props} icon="delete" onPress={onDelete} />
          </View>
        )}
      />
      <Card.Content>
        <Title>Actions</Title>
        <Text>
          {mode.actions && mode.actions.length > 0
            ? mode.actions.map((action) => action.type).join(', ')
            : 'No actions defined'}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default function ModesScreen() {
  const [modes, setModes] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    loadModes();
  }, []);

  const loadModes = async () => {
    try {
      const storedModes = await AsyncStorage.getItem(MODE_STORAGE_KEY);
      if (storedModes) {
        setModes(JSON.parse(storedModes));
      }
    } catch (error) {
      console.error('Failed to load modes:', error);
      Alert.alert('Error', 'Failed to load modes.');
    }
  };

  const saveModes = async (newModes) => {
    try {
      await AsyncStorage.setItem(MODE_STORAGE_KEY, JSON.stringify(newModes));
      setModes(newModes);
    } catch (error) {
      console.error('Failed to save modes:', error);
      Alert.alert('Error', 'Failed to save modes.');
    }
  };

  const handleAddMode = () => {
    router.push('/new-mode');
  };

  const handleDeleteMode = (modeToDelete) => {
    Alert.alert(
      'Delete Mode',
      `Are you sure you want to delete ${modeToDelete.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const updatedModes = modes.filter((mode) => mode.id !== modeToDelete.id);
            saveModes(updatedModes);
          },
        },
      ]
    );
  };

  const handleEditMode = (modeToEdit) => {
    router.push({
      pathname: '/edit-mode',
      params: { mode: JSON.stringify(modeToEdit) },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Title style={[styles.headerTitle, { color: colors.text }]}>Manage Modes</Title>
        <Button icon={() => <Plus color={colors.onPrimary} />} mode="contained" onPress={handleAddMode} style={styles.addButton}>
          Add Mode
        </Button>
      </View>
      <FlatList
        data={modes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ModeItem
            mode={item}
            onDelete={() => handleDeleteMode(item)}
            onEdit={() => handleEditMode(item)}
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
