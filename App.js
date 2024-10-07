import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityProvider } from './context/ActivityContext';
import { Ionicons } from '@expo/vector-icons';
import ActivitiesScreen from './Screens/Activities';
import DietScreen from './Screens/Diet';
import AddActivity from './Screens/AddAnActivity'; 
import { commonHeaderOptions } from './helpers/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = 'walk';
          } else if (route.name === 'Diet') {
            iconName = 'fast-food';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Activities" options={commonHeaderOptions}>
        {() => <ActivitiesScreen />}
      </Tab.Screen>
      <Tab.Screen name="Diet" options={commonHeaderOptions}>
        {() => <DietScreen/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ActivityProvider>
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
            options={{ title: 'Add An Activity', ...commonHeaderOptions }} 
          />
      </Stack.Navigator>
    </NavigationContainer>
    </ActivityProvider>
  );
}
