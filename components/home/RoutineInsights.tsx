import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

const ProgressBar = ({ percentage, color }) => {
  const colorScheme = useColorScheme();
  const width = useSharedValue(0);
  
  React.useEffect(() => {
    width.value = withTiming(percentage, { duration: 1000 });
  }, [percentage]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });
  
  return (
    <View style={[styles.progressBarContainer, { backgroundColor: Colors[colorScheme ?? 'light'].subtleBg }]}>
      <Animated.View
        style={[
          styles.progressBar,
          { backgroundColor: color },
          animatedStyle,
        ]}
      />
    </View>
  );
};

export default function RoutineInsights() {
  const colorScheme = useColorScheme();
  
  const insights = [
    {
      title: 'Morning Routines',
      executed: 18,
      total: 20,
      color: '#1A73E8',
    },
    {
      title: 'Evening Routines',
      executed: 12,
      total: 15,
      color: '#7C4DFF',
    },
    {
      title: 'Location-based',
      executed: 8,
      total: 10,
      color: '#00BFA5',
    },
  ];
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
        This Week's Performance
      </Text>
      
      <View style={[styles.insightsCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <View style={styles.insightHeader}>
              <Text style={[styles.insightTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                {insight.title}
              </Text>
              <Text style={[styles.insightCount, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                {insight.executed}/{insight.total}
              </Text>
            </View>
            
            <ProgressBar 
              percentage={(insight.executed / insight.total) * 100}
              color={insight.color}
            />
          </View>
        ))}
        
        <View style={styles.summaryContainer}>
          <Text style={[styles.summaryText, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
            Overall success rate
          </Text>
          <Text style={[styles.summaryPercentage, { color: Colors[colorScheme ?? 'light'].tint }]}>
            84%
          </Text>
        </View>
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
  insightsCard: {
    borderRadius: 12,
    padding: 16,
  },
  insightItem: {
    marginBottom: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  insightCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  summaryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  summaryPercentage: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
});