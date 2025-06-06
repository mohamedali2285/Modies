import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type HeaderTitleProps = {
  title: string;
  children?: ReactNode;
};

export default function HeaderTitle({ title, children }: HeaderTitleProps) {
  const colorScheme = useColorScheme();
  
  return (
    <View style={[
      styles.header, 
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Text style={[
        styles.title, 
        { color: Colors[colorScheme ?? 'light'].text }
      ]}>
        {title}
      </Text>
      
      {children && (
        <View style={styles.actions}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});