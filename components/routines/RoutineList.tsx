import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch, useColorScheme } from 'react-native';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

import Colors from '@/constants/Colors';
import { routines } from '@/data/routineData';

export default function RoutineList({ category }) {
  const colorScheme = useColorScheme();
  const [expandedId, setExpandedId] = useState(null);
  const [switchValues, setSwitchValues] = useState(
    routines.reduce((acc, routine) => {
      acc[routine.id] = routine.active;
      return acc;
    }, {})
  );
  
  const filteredRoutines = category === 'all' 
    ? routines 
    : routines.filter(routine => routine.categoryId === category);
  
  const toggleSwitch = (id) => {
    setSwitchValues({
      ...switchValues,
      [id]: !switchValues[id],
    });
  };
  
  return (
    <ScrollView style={styles.container}>
      {filteredRoutines.map((routine) => (
        <Animated.View
          key={routine.id}
          layout={Layout.springify()}
          entering={FadeIn.duration(300)}
          style={[
            styles.routineCard,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
          ]}
        >
          <TouchableOpacity
            style={styles.routineHeader}
            onPress={() => setExpandedId(expandedId === routine.id ? null : routine.id)}
          >
            <View style={styles.routineInfo}>
              <View 
                style={[
                  styles.routineIcon, 
                  { backgroundColor: routine.color + '20', borderColor: routine.color }
                ]}
              >
                <Text style={[styles.routineIconText, { color: routine.color }]}>
                  {routine.name.charAt(0)}
                </Text>
              </View>
              
              <View style={styles.routineDetails}>
                <Text style={[styles.routineName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {routine.name}
                </Text>
                <Text style={[styles.routineDescription, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                  {routine.time}
                </Text>
              </View>
            </View>
            
            <View style={styles.routineActions}>
              <Switch
                value={switchValues[routine.id]}
                onValueChange={() => toggleSwitch(routine.id)}
                trackColor={{ false: '#E5E5E5', true: Colors[colorScheme ?? 'light'].tint + '80' }}
                thumbColor={switchValues[routine.id] ? Colors[colorScheme ?? 'light'].tint : '#F5F5F5'}
              />
              
              <TouchableOpacity style={styles.moreButton}>
                <MoreVertical size={20} color={Colors[colorScheme ?? 'light'].secondaryText} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          
          {expandedId === routine.id && (
            <Animated.View 
              style={styles.expandedContent}
              entering={FadeIn.duration(300)}
            >
              <View style={styles.expandedSection}>
                <Text style={[styles.expandedTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Trigger
                </Text>
                <Text style={[styles.expandedDetail, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                  {routine.trigger}
                </Text>
              </View>
              
              <View style={styles.expandedSection}>
                <Text style={[styles.expandedTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Actions
                </Text>
                {routine.actions.map((action, index) => (
                  <Text 
                    key={index} 
                    style={[styles.expandedDetail, { color: Colors[colorScheme ?? 'light'].secondaryText }]}
                  >
                    {index + 1}. {action}
                  </Text>
                ))}
              </View>
              
              <View style={styles.expandedButtons}>
                <TouchableOpacity 
                  style={[
                    styles.expandedButton, 
                    { backgroundColor: Colors[colorScheme ?? 'light'].subtleBg }
                  ]}
                >
                  <Edit2 size={16} color={Colors[colorScheme ?? 'light'].text} />
                  <Text style={[styles.expandedButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Edit
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.expandedButton, 
                    { backgroundColor: Colors[colorScheme ?? 'light'].error + '10' }
                  ]}
                >
                  <Trash2 size={16} color={Colors[colorScheme ?? 'light'].error} />
                  <Text style={[styles.expandedButtonText, { color: Colors[colorScheme ?? 'light'].error }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  routineCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  routineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  routineIconText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  routineDetails: {
    flex: 1,
  },
  routineName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 4,
  },
  routineDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  routineActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreButton: {
    padding: 8,
    marginLeft: 8,
  },
  expandedContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  expandedSection: {
    marginBottom: 16,
  },
  expandedTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  expandedDetail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  expandedButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  expandedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  expandedButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
});