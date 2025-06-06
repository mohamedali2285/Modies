import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { ArrowUpRight } from 'lucide-react-native';

import Colors from '@/constants/Colors';

export default function SuggestedRoutines() {
  const colorScheme = useColorScheme();
  
  const suggestions = [
    {
      id: '1',
      title: 'Workout Mode',
      description: 'Set DND, connect to earbuds, open fitness app',
      color: '#1A73E8',
    },
    {
      id: '2',
      title: 'Focus Time',
      description: 'Block notifications, lower brightness, play ambient sounds',
      color: '#00BFA5',
    },
    {
      id: '3',
      title: 'Home Arrival',
      description: 'Connect to WiFi, turn on smart devices, set comfortable brightness',
      color: '#7C4DFF',
    },
  ];
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
        Suggested For You
      </Text>
      
      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            key={suggestion.id}
            style={[
              styles.suggestionCard,
              { backgroundColor: suggestion.color + '08' },
            ]}
          >
            <View style={styles.suggestionContent}>
              <Text style={[styles.suggestionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                {suggestion.title}
              </Text>
              <Text style={[
                styles.suggestionDescription, 
                { color: Colors[colorScheme ?? 'light'].secondaryText }
              ]}>
                {suggestion.description}
              </Text>
            </View>
            
            <View style={[styles.suggestionAction, { backgroundColor: suggestion.color }]}>
              <ArrowUpRight size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  suggestionsContainer: {
    gap: 12,
  },
  suggestionCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  suggestionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  suggestionAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});