import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

export default function ConditionBuilder() {
  const colorScheme = useColorScheme();
  const [showOperators, setShowOperators] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showValues, setShowValues] = useState(false);
  
  const [selectedOperator, setSelectedOperator] = useState('if');
  const [selectedCondition, setSelectedCondition] = useState('battery');
  const [selectedValue, setSelectedValue] = useState('charging');
  
  const operators = [
    { id: 'if', label: 'If' },
    { id: 'ifnot', label: 'If Not' },
  ];
  
  const conditions = [
    { id: 'time', label: 'Time' },
    { id: 'battery', label: 'Battery' },
    { id: 'location', label: 'Location' },
    { id: 'wifi', label: 'WiFi' },
  ];
  
  const getValueOptions = () => {
    switch (selectedCondition) {
      case 'battery':
        return [
          { id: 'charging', label: 'Is Charging' },
          { id: 'lowpower', label: 'Low Power Mode' },
          { id: 'level', label: 'Level Above 50%' },
        ];
      case 'wifi':
        return [
          { id: 'connected', label: 'Is Connected' },
          { id: 'home', label: 'Home Network' },
          { id: 'work', label: 'Work Network' },
        ];
      case 'time':
        return [
          { id: 'morning', label: 'Morning (6AM-12PM)' },
          { id: 'afternoon', label: 'Afternoon (12PM-6PM)' },
          { id: 'evening', label: 'Evening (6PM-12AM)' },
        ];
      case 'location':
        return [
          { id: 'home', label: 'At Home' },
          { id: 'work', label: 'At Work' },
          { id: 'traveling', label: 'Traveling' },
        ];
      default:
        return [];
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={[
        styles.conditionCard, 
        { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }
      ]}>
        <View style={styles.conditionRow}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].subtleBg,
                borderColor: showOperators ? Colors[colorScheme ?? 'light'].tint : 'transparent',
              }
            ]}
            onPress={() => setShowOperators(!showOperators)}
          >
            <Text style={[styles.dropdownButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {operators.find(op => op.id === selectedOperator)?.label}
            </Text>
            {showOperators ? 
              <ChevronUp size={16} color={Colors[colorScheme ?? 'light'].text} /> : 
              <ChevronDown size={16} color={Colors[colorScheme ?? 'light'].text} />
            }
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              styles.dropdownButtonWide,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].subtleBg,
                borderColor: showConditions ? Colors[colorScheme ?? 'light'].tint : 'transparent',
              }
            ]}
            onPress={() => setShowConditions(!showConditions)}
          >
            <Text style={[styles.dropdownButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {conditions.find(c => c.id === selectedCondition)?.label}
            </Text>
            {showConditions ? 
              <ChevronUp size={16} color={Colors[colorScheme ?? 'light'].text} /> : 
              <ChevronDown size={16} color={Colors[colorScheme ?? 'light'].text} />
            }
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              styles.dropdownButtonWide,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].subtleBg,
                borderColor: showValues ? Colors[colorScheme ?? 'light'].tint : 'transparent',
              }
            ]}
            onPress={() => setShowValues(!showValues)}
          >
            <Text style={[styles.dropdownButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>
              {getValueOptions().find(v => v.id === selectedValue)?.label}
            </Text>
            {showValues ? 
              <ChevronUp size={16} color={Colors[colorScheme ?? 'light'].text} /> : 
              <ChevronDown size={16} color={Colors[colorScheme ?? 'light'].text} />
            }
          </TouchableOpacity>
        </View>
        
        {showOperators && (
          <Animated.View 
            style={[
              styles.dropdownMenu,
              { backgroundColor: Colors[colorScheme ?? 'light'].subtleBg }
            ]}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            {operators.map((operator) => (
              <TouchableOpacity
                key={operator.id}
                style={[
                  styles.dropdownItem,
                  selectedOperator === operator.id && { 
                    backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' 
                  }
                ]}
                onPress={() => {
                  setSelectedOperator(operator.id);
                  setShowOperators(false);
                }}
              >
                <Text style={[styles.dropdownItemText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {operator.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
        
        {showConditions && (
          <Animated.View 
            style={[
              styles.dropdownMenu,
              { backgroundColor: Colors[colorScheme ?? 'light'].subtleBg }
            ]}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            {conditions.map((condition) => (
              <TouchableOpacity
                key={condition.id}
                style={[
                  styles.dropdownItem,
                  selectedCondition === condition.id && { 
                    backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' 
                  }
                ]}
                onPress={() => {
                  setSelectedCondition(condition.id);
                  setSelectedValue(getValueOptions()[0]?.id || '');
                  setShowConditions(false);
                }}
              >
                <Text style={[styles.dropdownItemText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {condition.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
        
        {showValues && (
          <Animated.View 
            style={[
              styles.dropdownMenu,
              { backgroundColor: Colors[colorScheme ?? 'light'].subtleBg }
            ]}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            {getValueOptions().map((value) => (
              <TouchableOpacity
                key={value.id}
                style={[
                  styles.dropdownItem,
                  selectedValue === value.id && { 
                    backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' 
                  }
                ]}
                onPress={() => {
                  setSelectedValue(value.id);
                  setShowValues(false);
                }}
              >
                <Text style={[styles.dropdownItemText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {value.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  conditionCard: {
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  conditionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    width: 80,
  },
  dropdownButtonWide: {
    flex: 1,
    minWidth: 120,
  },
  dropdownButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 4,
  },
  dropdownMenu: {
    borderRadius: 8,
    marginTop: 8,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    borderRadius: 6,
  },
  dropdownItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});