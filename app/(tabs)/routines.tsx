import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import RoutineList from '@/components/routines/RoutineList';
import HeaderTitle from '@/components/ui/HeaderTitle';
import { categories } from '@/data/routineData';

export default function RoutinesScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <HeaderTitle title="My Routines">
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} color={Colors[colorScheme ?? 'light'].text} />
          {showFilters ? 
            <ChevronUp size={20} color={Colors[colorScheme ?? 'light'].text} /> : 
            <ChevronDown size={20} color={Colors[colorScheme ?? 'light'].text} />
          }
        </TouchableOpacity>
      </HeaderTitle>
      
      {showFilters && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryContainer}
        >
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === 'all' && 
              {backgroundColor: Colors[colorScheme ?? 'light'].tint}
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === 'all' && {color: '#fff'}
            ]}>All</Text>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && 
                {backgroundColor: Colors[colorScheme ?? 'light'].tint}
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && {color: '#fff'}
              ]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <RoutineList category={selectedCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});