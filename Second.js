import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Second = () => {
  const [userData, setUserData] = useState({
    name: 'Education App',
    personalizedLearning: false,
    gamification: false,
    progressTracking: false,
    community: false,
  });

  // Load user data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data)); // Set data if available
        }
      } catch (error) {
        console.log('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save user data to AsyncStorage
  const saveUserData = async (newData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(newData));
      setUserData(newData); // Update local state
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  // Toggle features (just an example for one feature)
  const toggleFeature = (feature) => {
    const newData = { ...userData, [feature]: !userData[feature] };
    saveUserData(newData);
  };

  return (
    <View style={tw`flex-1 bg-gray-200`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center p-5 bg-blue-800`}>
        <Text style={tw`text-xl font-bold text-white`}>Course Dashboard</Text>
        <FontAwesome name="user-circle" size={30} color="white" />
      </View>

      {/* Welcome Section */}
      <View style={tw`p-5 bg-blue-100 rounded-b-xl`}>
        <Text style={tw`text-lg text-blue-800`}>Welcome Back,</Text>
        <Text style={tw`text-2xl font-semibold text-blue-900`}>{userData.name}</Text>
      </View>

      {/* Features */}
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-5`}>
        {/* Personalized Learning Path */}
        <View style={tw`bg-white rounded-lg shadow-lg p-5 mb-5`}>
          <View style={tw`flex-row items-center`}>
            <MaterialIcons name="school" size={24} color="#4C6EF5" />
            <Text style={tw`ml-3 text-lg font-semibold text-blue-700`}>
              Personalized Learning
            </Text>
          </View>
          <Text style={tw`mt-3 text-gray-700`}>
            Tailored learning paths and custom schedules to match your goals.
          </Text>
          <TouchableOpacity onPress={() => toggleFeature('personalizedLearning')}>
            <Text style={tw`mt-3 text-blue-600`}>
              {userData.personalizedLearning ? 'Disable' : 'Enable'} Feature
            </Text>
          </TouchableOpacity>
        </View>

        {/* Gamification */}
        <View style={tw`bg-white rounded-lg shadow-lg p-5 mb-5`}>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="trophy" size={24} color="#FFD700" />
            <Text style={tw`ml-3 text-lg font-semibold text-yellow-600`}>
              Gamification
            </Text>
          </View>
          <Text style={tw`mt-3 text-gray-700`}>
            Earn rewards and climb leaderboards as you progress.
          </Text>
          <TouchableOpacity onPress={() => toggleFeature('gamification')}>
            <Text style={tw`mt-3 text-yellow-500`}>
              {userData.gamification ? 'Disable' : 'Enable'} Feature
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Tracking */}
        <View style={tw`bg-white rounded-lg shadow-lg p-5 mb-5`}>
          <View style={tw`flex-row items-center`}>
            <FontAwesome name="line-chart" size={24} color="#28A745" />
            <Text style={tw`ml-3 text-lg font-semibold text-green-700`}>
              Progress Tracking
            </Text>
          </View>
          <Text style={tw`mt-3 text-gray-700`}>
            Visual dashboards to track weekly productivity and set goals.
          </Text>
          <TouchableOpacity onPress={() => toggleFeature('progressTracking')}>
            <Text style={tw`mt-3 text-green-500`}>
              {userData.progressTracking ? 'Disable' : 'Enable'} Feature
            </Text>
          </TouchableOpacity>
        </View>

        {/* Community and Collaboration */}
        <View style={tw`bg-white rounded-lg shadow-lg p-5 mb-5`}>
          <View style={tw`flex-row items-center`}>
            <MaterialIcons name="group" size={24} color="#007BFF" />
            <Text style={tw`ml-3 text-lg font-semibold text-blue-700`}>Community</Text>
          </View>
          <Text style={tw`mt-3 text-gray-700`}>
            Join groups, discuss topics, and collaborate with peers.
          </Text>
          <TouchableOpacity onPress={() => toggleFeature('community')}>
            <Text style={tw`mt-3 text-blue-500`}>
              {userData.community ? 'Disable' : 'Enable'} Feature
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={tw`flex-row justify-around items-center bg-blue-800 py-4`}>
        <FontAwesome name="home" size={26} color="white" />
        <FontAwesome name="book" size={26} color="white" />
        <FontAwesome name="bell" size={26} color="white" />
        <FontAwesome name="cog" size={26} color="white" />
      </View>
    </View>
  );
};

export default Second;
