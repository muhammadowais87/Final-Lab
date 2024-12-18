import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { supabase } from './supabase'; // Replace with your actual Supabase setup

function GamificationScreen() {
  const [points, setPoints] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [milestones, setMilestones] = useState([
    { id: 1, name: 'Complete First Lesson', points: 10, completed: false },
    { id: 2, name: 'Finish 5 Quizzes', points: 50, completed: false },
    { id: 3, name: 'Achieve 100 Points', points: 100, completed: false },
  ]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('Leaderboard')
        .select('*')
        .order('points', { ascending: false });

      if (error) {
        console.error('Error fetching leaderboard:', error);
      } else {
        setLeaderboard(data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const completeMilestone = (milestone) => {
    if (milestone.completed) {
      Alert.alert('Already Completed', `${milestone.name} is already completed.`);
      return;
    }

    setPoints(points + milestone.points);
    setMilestones((prevMilestones) =>
      prevMilestones.map((m) =>
        m.id === milestone.id ? { ...m, completed: true } : m
      )
    );

    Alert.alert(
      'Milestone Completed!',
      `You earned ${milestone.points} points! 🎉`
    );

    updateLeaderboard(points + milestone.points);
  };

  const updateLeaderboard = async (newPoints) => {
    try {
      const user = { username: 'User1', points: newPoints }; // Replace 'User1' with actual user data
      const { data, error } = await supabase
        .from('Leaderboard')
        .upsert(user, { onConflict: 'username' });

      if (error) {
        console.error('Error updating leaderboard:', error);
      } else {
        fetchLeaderboard(); // Refresh leaderboard
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-purple-900 py-4`}>
        <Text style={tw`text-white text-center text-xl font-bold`}>
          Gamification
        </Text>
      </View>

      {/* Reward Points */}
      <View style={tw`p-4 bg-yellow-200 flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-bold text-gray-700`}>Total Points:</Text>
        <Text style={tw`text-xl font-bold text-green-700`}>{points} pts</Text>
      </View>

      {/* Milestones */}
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Milestones:</Text>
        <FlatList
          data={milestones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-3 mb-2 rounded-lg ${
                item.completed ? 'bg-green-300' : 'bg-blue-300'
              }`}
              onPress={() => completeMilestone(item)}
            >
              <Text style={tw`text-gray-800 font-bold`}>{item.name}</Text>
              <Text style={tw`text-sm text-gray-600`}>
                Points: {item.points}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Leaderboard */}
      <View style={tw`p-4 bg-white rounded-t-3xl shadow-lg`}>
        <Text style={tw`text-lg font-bold text-gray-700 mb-3`}>Leaderboard:</Text>
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.username}
          renderItem={({ item, index }) => (
            <View
              style={tw`p-3 flex-row justify-between items-center ${
                index === 0
                  ? 'bg-yellow-300'
                  : index === 1
                  ? 'bg-gray-300'
                  : index === 2
                  ? 'bg-orange-300'
                  : 'bg-gray-100'
              } rounded-lg mb-2`}
            >
              <Text style={tw`text-gray-800 font-bold`}>
                {index + 1}. {item.username}
              </Text>
              <Text style={tw`text-gray-800`}>{item.points} pts</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default GamificationScreen;
