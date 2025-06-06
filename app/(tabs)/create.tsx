import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useColorScheme, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { Clock, MapPin, Zap, Smartphone, TriangleAlert as AlertTriangle, Plus } from 'lucide-react-native';
import * as Location from 'expo-location';

import Colors from '@/constants/Colors';
import CreateStepIndicator from '@/components/create/CreateStepIndicator';
import TriggerTypeCard from '@/components/create/TriggerTypeCard';
import ActionSelector from '@/components/create/ActionSelector';
import ConditionBuilder from '@/components/create/ConditionBuilder';
import HeaderTitle from '@/components/ui/HeaderTitle';
import Button from '@/components/ui/Button';
import { usePermissions } from '@/hooks/usePermissions';

const STEPS = ['Trigger', 'Conditions', 'Actions', 'Review'];

export default function CreateScreen() {
  const colorScheme = useColorScheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const permissions = usePermissions();
  
  const handleTriggerSelect = async (trigger: string) => {
    if (Platform.OS !== 'web') {
      if (trigger === 'location' && !permissions.location) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Location permission is required to use location-based triggers.',
            [{ text: 'OK' }]
          );
          return;
        }
      }
    }
    setSelectedTrigger(trigger);
  };
  
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save routine and go to routines page
      router.push('/routines');
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <HeaderTitle title="Create Routine" />
      
      <CreateStepIndicator steps={STEPS} currentStep={currentStep} />
      
      <ScrollView style={styles.content}>
        {currentStep === 0 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              What should trigger this routine?
            </Text>
            
            <View style={styles.triggerGrid}>
              <TriggerTypeCard
                icon={<Clock size={24} color={Colors[colorScheme ?? 'light'].tint} />}
                title="Time"
                description="Schedule by time or day"
                onSelect={() => handleTriggerSelect('time')}
                isSelected={selectedTrigger === 'time'}
              />
              
              <TriggerTypeCard
                icon={<MapPin size={24} color={Colors[colorScheme ?? 'light'].tint} />}
                title="Location"
                description="When arriving or leaving"
                onSelect={() => handleTriggerSelect('location')}
                isSelected={selectedTrigger === 'location'}
              />
              
              <TriggerTypeCard
                icon={<Smartphone size={24} color={Colors[colorScheme ?? 'light'].tint} />}
                title="Device"
                description="Phone state changes"
                onSelect={() => handleTriggerSelect('device')}
                isSelected={selectedTrigger === 'device'}
              />
              
              <TriggerTypeCard
                icon={<Zap size={24} color={Colors[colorScheme ?? 'light'].tint} />}
                title="App"
                description="When using an app"
                onSelect={() => handleTriggerSelect('app')}
                isSelected={selectedTrigger === 'app'}
              />
            </View>
          </View>
        )}
        
        {currentStep === 1 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Add conditions (optional)
            </Text>
            
            <ConditionBuilder />
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => {}}
            >
              <Plus size={20} color={Colors[colorScheme ?? 'light'].tint} />
              <Text style={[styles.addButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
                Add another condition
              </Text>
            </TouchableOpacity>
          </View>
        )}
        
        {currentStep === 2 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              What actions should happen?
            </Text>
            
            <ActionSelector />
          </View>
        )}
        
        {currentStep === 3 && (
          <View style={styles.stepContent}>
            <Text style={[styles.stepTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              Review your routine
            </Text>
            
            <View style={[styles.reviewCard, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
              <Text style={[styles.reviewTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                Morning Routine
              </Text>
              
              <View style={styles.reviewSection}>
                <Text style={[styles.reviewSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Trigger
                </Text>
                <Text style={[styles.reviewDetail, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                  Time: 7:00 AM, Every weekday
                </Text>
              </View>
              
              <View style={styles.reviewSection}>
                <Text style={[styles.reviewSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Conditions
                </Text>
                <Text style={[styles.reviewDetail, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                  If device is charging
                </Text>
              </View>
              
              <View style={styles.reviewSection}>
                <Text style={[styles.reviewSectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Actions
                </Text>
                <Text style={[styles.reviewDetail, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                  1. Turn on Do Not Disturb
                </Text>
                <Text style={[styles.reviewDetail, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                  2. Set brightness to 75%
                </Text>
                <Text style={[styles.reviewDetail, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                  3. Open Weather app
                </Text>
              </View>
              
              <View style={styles.reviewWarning}>
                <AlertTriangle size={16} color="#F59E0B" />
                <Text style={styles.reviewWarningText}>
                  This routine requires permission to modify system settings
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button 
            title="Back" 
            onPress={handleBack} 
            type="secondary"
            style={styles.footerButton}
          />
        )}
        
        <Button 
          title={currentStep === STEPS.length - 1 ? "Save" : "Next"} 
          onPress={handleNext}
          disabled={currentStep === 0 && !selectedTrigger}
          style={[styles.footerButton, currentStep === 0 && !selectedTrigger && styles.disabledButton]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stepContent: {
    marginBottom: 24,
  },
  stepTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  triggerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reviewTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewSectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 8,
  },
  reviewDetail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
  reviewWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  reviewWarningText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#92400E',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
});