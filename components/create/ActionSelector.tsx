import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { Wifi, Bluetooth, Bell, Volume2, BatteryMedium, Sun, Plus, X } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

const ActionCard = ({ icon, title, selected, onPress }) => {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.actionCard,
        { 
          backgroundColor: selected 
            ? Colors[colorScheme ?? 'light'].tint + '10' 
            : Colors[colorScheme ?? 'light'].cardBackground,
          borderColor: selected 
            ? Colors[colorScheme ?? 'light'].tint 
            : Colors[colorScheme ?? 'light'].border,
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.actionIcon}>{icon}</View>
      <Text style={[styles.actionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        {title}
      </Text>
      
      {selected && (
        <View style={[styles.selectedIndicator, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
          <X size={12} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function ActionSelector() {
  const colorScheme = useColorScheme();
  const [selectedActions, setSelectedActions] = useState([]);
  
  const actions = [
    { id: 'wifi', title: 'WiFi', icon: <Wifi size={20} color={Colors[colorScheme ?? 'light'].tint} /> },
    { id: 'bluetooth', title: 'Bluetooth', icon: <Bluetooth size={20} color={Colors[colorScheme ?? 'light'].tint} /> },
    { id: 'dnd', title: 'Do Not Disturb', icon: <Bell size={20} color={Colors[colorScheme ?? 'light'].tint} /> },
    { id: 'volume', title: 'Volume', icon: <Volume2 size={20} color={Colors[colorScheme ?? 'light'].tint} /> },
    { id: 'battery', title: 'Battery Mode', icon: <BatteryMedium size={20} color={Colors[colorScheme ?? 'light'].tint} /> },
    { id: 'brightness', title: 'Brightness', icon: <Sun size={20} color={Colors[colorScheme ?? 'light'].tint} /> },
  ];
  
  const toggleAction = (id) => {
    if (selectedActions.includes(id)) {
      setSelectedActions(selectedActions.filter(actionId => actionId !== id));
    } else {
      setSelectedActions([...selectedActions, id]);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            icon={action.icon}
            title={action.title}
            selected={selectedActions.includes(action.id)}
            onPress={() => toggleAction(action.id)}
          />
        ))}
        
        <TouchableOpacity
          style={[
            styles.actionCard,
            styles.addActionCard,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
          ]}
        >
          <Plus size={20} color={Colors[colorScheme ?? 'light'].tint} />
          <Text style={[styles.addActionText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            More
          </Text>
        </TouchableOpacity>
      </View>
      
      {selectedActions.length > 0 && (
        <Animated.View 
          style={[
            styles.selectedActionsContainer,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
          ]}
          entering={FadeIn.duration(300)}
          layout={Layout.springify()}
        >
          <Text style={[styles.selectedActionsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Selected Actions
          </Text>
          
          <ScrollView style={styles.selectedActionsList}>
            {selectedActions.map((id, index) => {
              const action = actions.find(a => a.id === id);
              return (
                <Animated.View
                  key={id}
                  style={[
                    styles.selectedActionItem,
                    { borderBottomColor: Colors[colorScheme ?? 'light'].border }
                  ]}
                  entering={FadeIn.duration(300)}
                  exiting={FadeOut.duration(300)}
                  layout={Layout.springify()}
                >
                  <View style={styles.selectedActionNumber}>
                    <Text style={styles.selectedActionNumberText}>{index + 1}</Text>
                  </View>
                  
                  <View style={styles.selectedActionContent}>
                    <Text style={[styles.selectedActionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {action?.title}
                    </Text>
                    <Text style={[
                      styles.selectedActionDescription, 
                      { color: Colors[colorScheme ?? 'light'].secondaryText }
                    ]}>
                      Tap to configure
                    </Text>
                  </View>
                </Animated.View>
              );
            })}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  addActionCard: {
    borderStyle: 'dashed',
  },
  addActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginTop: 8,
  },
  selectedActionsContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  selectedActionsTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 16,
  },
  selectedActionsList: {
    maxHeight: 200,
  },
  selectedActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  selectedActionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedActionNumberText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#5F6368',
  },
  selectedActionContent: {
    flex: 1,
  },
  selectedActionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  selectedActionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  selectedIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});