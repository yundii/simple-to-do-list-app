import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityDietProvider } from './context/ActivityDietContext';
import { ThemeProvider } from './context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import ActivitiesScreen from './Screens/Activities';
import DietScreen from './Screens/Diet';
import SettingsScreen from './Screens/Settings';
import AddActivity from './Screens/AddAnActivity'; 
import { commonHeaderOptions } from './helpers/styles';
import AddDietEntry from './Screens/AddADietEntry';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//const theme = useContext(ThemeContext);

function TabNavigator() {
  //const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = 'walk';
          } else if (route.name === 'Diet') {
            iconName = 'fast-food';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: 'purple' },
      })}
    >
      <Tab.Screen name="Activities" options={commonHeaderOptions}>
        {() => <ActivitiesScreen  />}
      </Tab.Screen>
      <Tab.Screen name="Diet"options={commonHeaderOptions} >
        {() => <DietScreen />}
      </Tab.Screen>
      <Tab.Screen name="Settings" options={commonHeaderOptions}>
        {() => <SettingsScreen />}
      </Tab.Screen>
    </Tab.Navigator>
    </ThemeProvider>
  );
}

export default function App() {
  return (

    <ActivityDietProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="Home" 
            component={TabNavigator} 
            options={{ headerShown: false, ...commonHeaderOptions }} 
          />
        <Stack.Screen 
            name="AddActivity" 
            component={AddActivity} 
            options={{ title: 'Add An Activity', ...commonHeaderOptions}} 
          />
        <Stack.Screen 
            name="AddDietEntry" 
            component={AddDietEntry} 
            options={{ title: 'Add A Diet Entry', ...commonHeaderOptions}} 
          />
      </Stack.Navigator>
    </NavigationContainer>
    </ActivityDietProvider>
  );
}
