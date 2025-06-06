export const categories = [
  { id: 'morning', name: 'Morning' },
  { id: 'evening', name: 'Evening' },
  { id: 'work', name: 'Work' },
  { id: 'home', name: 'Home' },
  { id: 'custom', name: 'Custom' },
];

export const recentRoutines = [
  {
    id: '1',
    name: 'Morning Routine',
    time: 'Every weekday, 7:00 AM',
    active: true,
    color: '#1A73E8',
    icon: 'alarm-clock',
  },
  {
    id: '2',
    name: 'Commute Mode',
    time: 'Mon-Fri, 8:30 AM',
    active: true,
    color: '#00BFA5',
    icon: 'car',
  },
  {
    id: '3',
    name: 'Evening Mode',
    time: 'Daily, 9:00 PM',
    active: false,
    color: '#7C4DFF',
    icon: 'sunset',
  },
  {
    id: '4',
    name: 'Workout Mode',
    time: 'Mon, Wed, Fri, 6:00 PM',
    active: true,
    color: '#FBBC04',
    icon: 'zap',
  },
];

export const routines = [
  {
    id: '1',
    name: 'Morning Routine',
    description: 'Daily morning setup',
    time: 'Every weekday, 7:00 AM',
    active: true,
    categoryId: 'morning',
    color: '#1A73E8',
    trigger: 'Time: 7:00 AM, Every weekday',
    actions: [
      'Turn on Do Not Disturb',
      'Set brightness to 75%',
      'Open Weather app',
    ],
  },
  {
    id: '2',
    name: 'Commute Mode',
    description: 'Settings for commuting',
    time: 'Mon-Fri, 8:30 AM',
    active: true,
    categoryId: 'work',
    color: '#00BFA5',
    trigger: 'Time: 8:30 AM, Mon-Fri',
    actions: [
      'Connect to car Bluetooth',
      'Open Maps app',
      'Start navigation to Work',
    ],
  },
  {
    id: '3',
    name: 'Work Focus',
    description: 'Minimize distractions',
    time: 'Weekdays, 9:00 AM',
    active: true,
    categoryId: 'work',
    color: '#FBBC04',
    trigger: 'Location: Arriving at Work',
    actions: [
      'Turn on Do Not Disturb',
      'Set volume to 30%',
      'Connect to Work WiFi',
    ],
  },
  {
    id: '4',
    name: 'Evening Mode',
    description: 'Wind down settings',
    time: 'Daily, 9:00 PM',
    active: false,
    categoryId: 'evening',
    color: '#7C4DFF',
    trigger: 'Time: 9:00 PM, Daily',
    actions: [
      'Turn on Blue Light Filter',
      'Set brightness to 40%',
      'Set volume to 50%',
    ],
  },
  {
    id: '5',
    name: 'Home Arrival',
    description: 'Home comfort settings',
    time: 'Weekdays, 6:00 PM',
    active: true,
    categoryId: 'home',
    color: '#EA4335',
    trigger: 'Location: Arriving at Home',
    actions: [
      'Connect to Home WiFi',
      'Turn off Do Not Disturb',
      'Set brightness to 70%',
    ],
  },
  {
    id: '6',
    name: 'Weekend Mode',
    description: 'Relax settings',
    time: 'Sat-Sun, 9:00 AM',
    active: true,
    categoryId: 'custom',
    color: '#34A853',
    trigger: 'Time: 9:00 AM, Sat-Sun',
    actions: [
      'Turn off alarms',
      'Set volume to 70%',
      'Turn on WiFi',
    ],
  },
];

export const scheduledRoutines = [
  {
    id: '1',
    name: 'Morning Routine',
    time: '7:00',
    days: [1, 2, 3, 4, 5], // Mon-Fri
    color: '#1A73E8',
  },
  {
    id: '2',
    name: 'Commute Mode',
    time: '8:30',
    days: [1, 2, 3, 4, 5], // Mon-Fri
    color: '#00BFA5',
  },
  {
    id: '3',
    name: 'Work Focus',
    time: '9:00',
    days: [1, 2, 3, 4, 5], // Mon-Fri
    color: '#FBBC04',
  },
  {
    id: '4',
    name: 'Lunch Break',
    time: '12:00',
    days: [1, 2, 3, 4, 5], // Mon-Fri
    color: '#EA4335',
  },
  {
    id: '5',
    name: 'Home Arrival',
    time: '18:00',
    days: [1, 2, 3, 4, 5], // Mon-Fri
    color: '#EA4335',
  },
  {
    id: '6',
    name: 'Evening Mode',
    time: '21:00',
    days: [0, 1, 2, 3, 4, 5, 6], // Every day
    color: '#7C4DFF',
  },
  {
    id: '7',
    name: 'Weekend Mode',
    time: '9:00',
    days: [0, 6], // Sat-Sun
    color: '#34A853',
  },
  {
    id: '8',
    name: 'Workout Mode',
    time: '18:00',
    days: [1, 3, 5], // Mon, Wed, Fri
    color: '#FBBC04',
  },
];