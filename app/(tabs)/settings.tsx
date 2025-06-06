import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { ChevronRight, Bell, Moon, Shield, FileText, HelpCircle, Lock } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import HeaderTitle from '@/components/ui/HeaderTitle';

const SettingItem = ({ icon, title, description, hasToggle = false, onToggleChange, value, onPress }) => {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity 
      style={[styles.settingItem, { borderBottomColor: Colors[colorScheme ?? 'light'].border }]}
      onPress={onPress}
      disabled={hasToggle}
    >
      <View style={styles.settingIconContainer}>
        {icon}
      </View>
      
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          {title}
        </Text>
        {description && (
          <Text style={[styles.settingDescription, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
            {description}
          </Text>
        )}
      </View>
      
      {hasToggle ? (
        <Switch
          value={value}
          onValueChange={onToggleChange}
          trackColor={{ false: '#E5E5E5', true: Colors[colorScheme ?? 'light'].tint + '80' }}
          thumbColor={value ? Colors[colorScheme ?? 'light'].tint : '#F5F5F5'}
        />
      ) : (
        <ChevronRight size={20} color={Colors[colorScheme ?? 'light'].secondaryText} />
      )}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <HeaderTitle title="Settings" />
      
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
          App Settings
        </Text>
        
        <SettingItem
          icon={<Bell size={22} color={Colors[colorScheme ?? 'light'].tint} />}
          title="Notifications"
          description="Manage routine notifications"
          hasToggle={true}
          value={notificationsEnabled}
          onToggleChange={setNotificationsEnabled}
        />
        
        <SettingItem
          icon={<Moon size={22} color={Colors[colorScheme ?? 'light'].tint} />}
          title="Dark Mode"
          description="Toggle dark theme"
          hasToggle={true}
          value={darkModeEnabled}
          onToggleChange={setDarkModeEnabled}
        />
        
        <SettingItem
          icon={<Shield size={22} color={Colors[colorScheme ?? 'light'].tint} />}
          title="Permissions"
          description="Manage app permissions"
          onPress={() => {}}
        />
        
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
          Security
        </Text>
        
        <SettingItem
          icon={<Lock size={22} color={Colors[colorScheme ?? 'light'].tint} />}
          title="App Lock"
          description="Protect with biometrics"
          hasToggle={true}
          value={biometricsEnabled}
          onToggleChange={setBiometricsEnabled}
        />
        
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
          Support
        </Text>
        
        <SettingItem
          icon={<HelpCircle size={22} color={Colors[colorScheme ?? 'light'].tint} />}
          title="Help & Support"
          description="Get assistance"
          onPress={() => {}}
        />
        
        <SettingItem
          icon={<FileText size={22} color={Colors[colorScheme ?? 'light'].tint} />}
          title="Privacy Policy"
          onPress={() => {}}
        />
        
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: Colors[colorScheme ?? 'light'].secondaryText }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 2,
  },
  versionContainer: {
    padding: 24,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});