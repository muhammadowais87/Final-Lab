import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Math from './Math';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GamificationScreen from './GamificationScreen';
import CommunityScreen from './CommunityScreen';
import ProgressTrackingScreen from './ProgressTrackingScreen';
import Quizzes from './Quizzes';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'black' }, // Change the header background color to black
        headerTintColor: 'white', // Change the header text color to white
        tabBarStyle: { backgroundColor: 'black' }, // Change the tab bar background color to black
        tabBarActiveTintColor: 'white', // Change the active tab text/icon color to white
        tabBarInactiveTintColor: 'gray', // Change the inactive tab text/icon color to gray
      }}>
      <Tab.Screen
        name="GamificationScreen"
        component={GamificationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          tabBarLabel: 'GamificationScreen',
        }}
      />

      <Tab.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calculator" color={color} size={size} />
          ),
          tabBarLabel: 'CommunityScreen',
        }}
      />

      <Tab.Screen
        name="ProgressTrackingScreen"
        component={ProgressTrackingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus" color={color} size={size} />
          ),
          tabBarLabel: 'ProgressTrackingScreen',
        }}
      />

      <Tab.Screen
        name="Quizzes"
        component={Finance}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="coins" color={color} size={size} />
          ),
          tabBarLabel: 'Quizzes',
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

// Home.js
