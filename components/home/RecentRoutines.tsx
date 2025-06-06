import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme, ScrollView } from 'react-native';
import { ChevronRight, Zap, AlarmClock, Car, Sunset } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { recentRoutines } from '@/data/routineData';

const RoutineCard = ({ routine }) => {
  const colorScheme = useColorScheme();
  
  const getIcon = () => {
    switch (routine.icon) {
      case 'alarm-clock':
        return <AlarmClock size={18} color="#fff" />;
      case 'car':
        return <Car size={18} color="#fff" />;
      case 'sunset':
        return <Sunset size={18} color="#fff" />;
      default:
        return <Zap size={18} color="#fff" />;
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.routineCard, 
        { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: routine.color }]}>
        {getIcon()}
      </View>
      
      <View style={styles.routineContent}>
        <Text style={[styles.routineName, { color: Colors[colorScheme ?? 'light'].text }]}>
          {routine.name}
        </Text>
        <Text style={[styles.routineTime, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
          {routine.time}
        </Text>
      </View>
      
      <View style={styles.routineStatus}>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: routine.active ? '#34A853' : '#9AA0A6' }
        ]} />
        <Text style={[
          styles.statusText, 
          { color: Colors[colorScheme ?? 'light'].secondaryText }
        ]}>
          {routine.active ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function RecentRoutines() {
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Recent Routines
        </Text>
        <TouchableOpacity style={styles.viewAll}>
          <Text style={[styles.viewAllText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            View all
          </Text>
          <ChevronRight size={16} color={Colors[colorScheme ?? 'light'].tint} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.routinesContainer}
      >
        {recentRoutines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  routinesContainer: {
    paddingHorizontal: 12,
  },
  routineCard: {
    width: 220,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineContent: {
    marginBottom: 12,
  },
  routineName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  routineTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  routineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});