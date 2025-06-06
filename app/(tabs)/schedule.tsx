import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import WeekCalendar from '@/components/schedule/WeekCalendar';
import ScheduleTimeline from '@/components/schedule/ScheduleTimeline';
import HeaderTitle from '@/components/ui/HeaderTitle';

export default function ScheduleScreen() {
  const colorScheme = useColorScheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <HeaderTitle title="Schedule" />
      
      <WeekCalendar 
        selectedDate={selectedDate} 
        onSelectDate={setSelectedDate} 
      />
      
      <ScrollView style={styles.timelineContainer}>
        <ScheduleTimeline date={selectedDate} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timelineContainer: {
    flex: 1,
    padding: 16,
  },
});