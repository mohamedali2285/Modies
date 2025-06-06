import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

type CreateStepIndicatorProps = {
  steps: string[];
  currentStep: number;
};

export default function CreateStepIndicator({ steps, currentStep }: CreateStepIndicatorProps) {
  const colorScheme = useColorScheme();
  const progress = useSharedValue(0);
  
  React.useEffect(() => {
    progress.value = withTiming(currentStep / (steps.length - 1), { duration: 300 });
  }, [currentStep, steps.length]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });
  
  return (
    <View style={styles.container}>
      <View style={[styles.progressTrack, { backgroundColor: Colors[colorScheme ?? 'light'].subtleBg }]}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { backgroundColor: Colors[colorScheme ?? 'light'].tint },
            progressStyle,
          ]}
        />
      </View>
      
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View 
              style={[
                styles.stepIndicator,
                { 
                  backgroundColor: index <= currentStep 
                    ? Colors[colorScheme ?? 'light'].tint 
                    : Colors[colorScheme ?? 'light'].subtleBg,
                  borderColor: index <= currentStep 
                    ? Colors[colorScheme ?? 'light'].tint 
                    : Colors[colorScheme ?? 'light'].border,
                }
              ]}
            >
              {index < currentStep ? (
                <Text style={styles.stepComplete}>✓</Text>
              ) : (
                <Text style={[
                  styles.stepNumber, 
                  { 
                    color: index === currentStep 
                      ? '#fff' 
                      : Colors[colorScheme ?? 'light'].secondaryText 
                  }
                ]}>
                  {index + 1}
                </Text>
              )}
            </View>
            
            <Text 
              style={[
                styles.stepText,
                { 
                  color: index <= currentStep 
                    ? Colors[colorScheme ?? 'light'].text 
                    : Colors[colorScheme ?? 'light'].secondaryText,
                  fontFamily: index === currentStep ? 'Inter-Bold' : 'Inter-Regular',
                }
              ]}
            >
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepItem: {
    alignItems: 'center',
    width: '25%',
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
  },
  stepNumber: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  stepComplete: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  stepText: {
    fontSize: 12,
    textAlign: 'center',
  },
});