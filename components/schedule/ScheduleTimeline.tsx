import React from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import { scheduledRoutines } from '@/data/routineData';

type ScheduleTimelineProps = {
  date: Date;
};

export default function ScheduleTimeline({ date }: ScheduleTimelineProps) {
  const colorScheme = useColorScheme();
  
  // Filter routines for the selected date
  const getRoutinesForDate = () => {
    const dayOfWeek = date.getDay();
    return scheduledRoutines.filter(routine => {
      // Check if the routine is scheduled for this day of week
      if (routine.days.includes(dayOfWeek)) {
        return true;
      }
      return false;
    });
  };
  
  const filteredRoutines = getRoutinesForDate();
  
  // Generate time slots from 5AM to 11PM
  const timeSlots = Array.from({ length: 19 }, (_, i) => {
    const hour = i + 5; // Start from 5 AM
    return hour < 12 
      ? `${hour} AM` 
      : hour === 12 
        ? '12 PM' 
        : `${hour - 12} PM`;
  });
  
  // Get routines for a specific time slot
  const getRoutinesForTimeSlot = (timeSlot: string) => {
    const hour = parseInt(timeSlot.split(' ')[0]);
    const isPM = timeSlot.includes('PM');
    
    let hourIn24 = hour;
    if (isPM && hour !== 12) {
      hourIn24 = hour + 12;
    } else if (!isPM && hour === 12) {
      hourIn24 = 0;
    }
    
    return filteredRoutines.filter(routine => {
      const routineHour = parseInt(routine.time.split(':')[0]);
      return routineHour === hourIn24;
    });
  };
  
  return (
    <View style={styles.container}>
      {timeSlots.map((timeSlot, index) => {
        const routinesForSlot = getRoutinesForTimeSlot(timeSlot);
        
        return (
          <View key={index} style={styles.timeSlot}>
            <View style={styles.timeColumn}>
              <Text style={[styles.timeText, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                {timeSlot}
              </Text>
              <View style={[styles.timeLine, { backgroundColor: Colors[colorScheme ?? 'light'].border }]} />
            </View>
            
            <View style={styles.routinesColumn}>
              {routinesForSlot.length > 0 ? (
                routinesForSlot.map((routine, rIndex) => (
                  <View 
                    key={rIndex} 
                    style={[
                      styles.routineItem,
                      { 
                        backgroundColor: routine.color + '20',
                        borderLeftColor: routine.color,
                      }
                    ]}
                  >
                    <Text style={[styles.routineName, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {routine.name}
                    </Text>
                    <Text style={[styles.routineTime, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
                      {routine.time}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.emptySlot} />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  timeSlot: {
    flexDirection: 'row',
    minHeight: 60,
  },
  timeColumn: {
    width: 60,
    alignItems: 'center',
    paddingTop: 10,
  },
  timeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  timeLine: {
    flex: 1,
    width: 1,
  },
  routinesColumn: {
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 6,
  },
  routineItem: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  routineName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 4,
  },
  routineTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  emptySlot: {
    height: 8,
  },
});