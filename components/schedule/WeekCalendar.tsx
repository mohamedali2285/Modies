import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import Colors from '@/constants/Colors';

type WeekCalendarProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};

export default function WeekCalendar({ selectedDate, onSelectDate }: WeekCalendarProps) {
  const colorScheme = useColorScheme();
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  useEffect(() => {
    generateWeekDates(selectedDate);
  }, [selectedDate]);
  
  const generateWeekDates = (currentDate: Date) => {
    const dates: Date[] = [];
    const curr = new Date(currentDate);
    const day = curr.getDay();
    
    // Starting from Sunday
    const first = curr.getDate() - day;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(curr);
      date.setDate(first + i);
      dates.push(date);
    }
    
    setWeekDates(dates);
  };
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    onSelectDate(newDate);
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].cardBackground }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigateWeek('prev')}
        >
          <ChevronLeft size={20} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        
        <Text style={[styles.monthText, { color: Colors[colorScheme ?? 'light'].text }]}>
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </Text>
        
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigateWeek('next')}
        >
          <ChevronRight size={20} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      >
        {weekDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayItem,
              isSelected(date) && { 
                backgroundColor: Colors[colorScheme ?? 'light'].tint 
              },
            ]}
            onPress={() => onSelectDate(date)}
          >
            <Text style={[
              styles.dayName,
              { 
                color: isSelected(date) 
                  ? '#fff' 
                  : Colors[colorScheme ?? 'light'].secondaryText 
              }
            ]}>
              {dayNames[date.getDay()]}
            </Text>
            
            <View style={[
              styles.dateCircle,
              isToday(date) && !isSelected(date) && { 
                borderColor: Colors[colorScheme ?? 'light'].tint 
              },
            ]}>
              <Text style={[
                styles.dateText,
                { 
                  color: isSelected(date) 
                    ? '#fff' 
                    : Colors[colorScheme ?? 'light'].text,
                  fontFamily: isToday(date) ? 'Inter-Bold' : 'Inter-Regular',
                }
              ]}>
                {date.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  navigationButton: {
    padding: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  dayName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});