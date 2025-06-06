import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

type TriggerTypeCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onSelect: () => void;
  isSelected: boolean;
};

export default function TriggerTypeCard({ 
  icon, 
  title, 
  description, 
  onSelect, 
  isSelected 
}: TriggerTypeCardProps) {
  const colorScheme = useColorScheme();
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(
        isSelected ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].border,
        { duration: 200 }
      ),
      backgroundColor: withTiming(
        isSelected ? Colors[colorScheme ?? 'light'].tint + '10' : Colors[colorScheme ?? 'light'].cardBackground,
        { duration: 200 }
      ),
    };
  });
  
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <TouchableOpacity
        style={styles.content}
        onPress={onSelect}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            {icon}
          </View>
          
          <View 
            style={[
              styles.selectionIndicator,
              { 
                borderColor: isSelected 
                  ? Colors[colorScheme ?? 'light'].tint 
                  : Colors[colorScheme ?? 'light'].border,
                backgroundColor: isSelected 
                  ? Colors[colorScheme ?? 'light'].tint 
                  : 'transparent',
              }
            ]}
          >
            {isSelected && <View style={styles.selectionDot} />}
          </View>
        </View>
        
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          {title}
        </Text>
        
        <Text style={[styles.description, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
          {description}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  selectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    padding: 2,
  },
  selectionDot: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});