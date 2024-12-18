import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Page2 from './Page2';
import { Provider } from 'react-redux';
import store from './redux/store';
import Second from './Second';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Second"
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
      }}
    >
     
      <Tab.Screen name="Second" component={Second} />
     
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Second">
          <Stack.Screen name="Second" component={TabNavigator} options={{ headerShown: false }} />
        
          <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false }} />
          
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;


const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange',
    bottom: 50, // Adjusted for a better position
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});