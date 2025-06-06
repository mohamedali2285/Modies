import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { BedDouble, Coffee, Moon, Bluetooth, Wifi, Plus } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

const QuickActionButton = ({ icon, title, color, isActive, onPress }) => {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.actionButton,
        {
          backgroundColor: isActive 
            ? color + '20'
            : Colors[colorScheme ?? 'light'].cardBackground,
          borderColor: isActive ? color : Colors[colorScheme ?? 'light'].border,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: isActive ? color : Colors[colorScheme ?? 'light'].subtleBg },
        ]}
      >
        {icon}
      </View>
      <Text
        style={[
          styles.actionText,
          { color: isActive ? color : Colors[colorScheme ?? 'light'].text },
        ]}
      >
        {title}
      </Text>
      
      {isActive && (
        <Animated.View 
          style={styles.activeIndicator}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
        >
          <View style={[styles.activeIndicatorDot, { backgroundColor: color }]} />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default function QuickActions() {
  const colorScheme = useColorScheme();
  const [activeAction, setActiveAction] = React.useState('sleep');
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Quick Actions
        </Text>
      </View>
      
      <View style={styles.actionGrid}>
        <QuickActionButton
          icon={<BedDouble size={20} color={activeAction === 'sleep' ? '#fff' : '#1A73E8'} />}
          title="Sleep Mode"
          color="#1A73E8"
          isActive={activeAction === 'sleep'}
          onPress={() => setActiveAction('sleep')}
        />
        
        <QuickActionButton
          icon={<Coffee size={20} color={activeAction === 'morning' ? '#fff' : '#00BFA5'} />}
          title="Morning"
          color="#00BFA5"
          isActive={activeAction === 'morning'}
          onPress={() => setActiveAction('morning')}
        />
        
        <QuickActionButton
          icon={<Moon size={20} color={activeAction === 'night' ? '#fff' : '#7C4DFF'} />}
          title="Night Mode"
          color="#7C4DFF"
          isActive={activeAction === 'night'}
          onPress={() => setActiveAction('night')}
        />
        
        <QuickActionButton
          icon={<Bluetooth size={20} color={activeAction === 'bluetooth' ? '#fff' : '#FBBC04'} />}
          title="Bluetooth"
          color="#FBBC04"
          isActive={activeAction === 'bluetooth'}
          onPress={() => setActiveAction('bluetooth')}
        />
        
        <QuickActionButton
          icon={<Wifi size={20} color={activeAction === 'wifi' ? '#fff' : '#34A853'} />}
          title="WiFi"
          color="#34A853"
          isActive={activeAction === 'wifi'}
          onPress={() => setActiveAction('wifi')}
        />
        
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.addButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground },
          ]}
        >
          <Plus size={24} color={Colors[colorScheme ?? 'light'].tint} />
          <Text style={[styles.addButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
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
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  actionButton: {
    width: '30%',
    margin: '1.66%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 120,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  activeIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  addButton: {
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginTop: 8,
  },
});