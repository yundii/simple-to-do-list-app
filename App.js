import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ActivitiesScreen from './Screens/Activities';
import DietScreen from './Screens/Diet';
import { commonHeaderOptions } from './helpers/styles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const activitiesData = [
  { id: '1', name: 'Yoga', date: 'Mon Sep 16 2024', value: '60 min' },
  { id: '2', name: 'Weights', date: 'Mon Jul 15 2024', value: '120 min' },
];

const dietData = [
  { id: '1', name: 'Breakfast', date: 'Tue Sep 17 2024', value: '500 cal' },
  { id: '2', name: 'Lunch', date: 'Wed Sep 25 2024', value: '900 cal' },
];

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
        {() => <ActivitiesScreen data={activitiesData}/>}
      </Tab.Screen>
      <Tab.Screen name="Diet" options={commonHeaderOptions}>
        {() => <DietScreen data={dietData}/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false, ...commonHeaderOptions }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
