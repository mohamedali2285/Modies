import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={{
      version: 3,
      isV3: true,
      mode: colorScheme === 'dark' ? 'adaptive' : 'exact',
      colors: {
        primary: '#6200EE',
        secondary: '#03DAC5',
        accent: '#03DAC5',
        background: colorScheme === 'dark' ? '#121212' : '#F2F2F2',
        text: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
        surface: colorScheme === 'dark' ? '#303030' : '#FFFFFF',
        error: '#B00020',
        onPrimary: '#FFFFFF',
        onSecondary: '#000000',
        onSurface: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
        onError: '#FFFFFF',
        onBackground: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
        outline: '#8E8E93',
        elevation: {
          level0: 'transparent',
          level1: colorScheme === 'dark' ? '#3B3B3B' : '#FFFFFF',
          level2: colorScheme === 'dark' ? '#4A4A4A' : '#FFFFFF',
          level3: colorScheme === 'dark' ? '#5A5A5A' : '#FFFFFF',
          level4: colorScheme === 'dark' ? '#696969' : '#FFFFFF',
          level5: colorScheme === 'dark' ? '#787878' : '#FFFFFF',
        },
        primaryContainer: '#BB86FC',
        onPrimaryContainer: '#000000',
        secondaryContainer: '#03DAC6',
        onSecondaryContainer: '#000000',
        tertiary: '#3700B3',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#98DAFF',
        onTertiaryContainer: '#000000',
      },
    }}>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Modes',
            tabBarIcon: ({ color }) => <Text style={{ color }}>Modes</Text>,
          }}
        />
        <Tabs.Screen
          name="routines"
          options={{
            title: 'Routines',
            tabBarIcon: ({ color }) => <Text style={{ color }}>Routines</Text>,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Text style={{ color }}>Settings</Text>,
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
