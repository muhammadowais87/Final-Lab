import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { VictoryPie } from 'victory-native';
import tw from 'twrnc';

function ProgressTrackingScreen() {
  const [completedLessons, setCompletedLessons] = useState(7);
  const [totalLessons, setTotalLessons] = useState(10);
  const [goal, setGoal] = useState(5);
  const [achieved, setAchieved] = useState(3);

  const progress = completedLessons / totalLessons;

  const handleSetGoal = (value) => {
    if (isNaN(value) || value < 0) {
      alert('Please enter a valid number.');
      return;
    }
    setGoal(parseInt(value, 10));
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-blue-900 py-4`}>
        <Text style={tw`text-white text-center text-xl font-bold`}>
          Progress Tracking
        </Text>
      </View>

      {/* Progress Dashboard */}
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold mb-3`}>Your Progress:</Text>
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-700`}>Lessons Completed: {completedLessons}/{totalLessons}</Text>
          <ProgressBar
            progress={progress}
            color="#4CAF50"
            style={tw`h-4 rounded-lg`}
          />
        </View>

        {/* Goal Progress - Pie Chart */}
        <Text style={tw`text-lg font-bold mb-3`}>Weekly Goals:</Text>
        <View style={tw`items-center`}>
          <VictoryPie
            data={[
              { x: 'Achieved', y: achieved },
              { x: 'Remaining', y: goal - achieved },
            ]}
            colorScale={['#4CAF50', '#FFCC00']}
            width={300}
            height={300}
            innerRadius={70}
            labelRadius={({ innerRadius }) => innerRadius + 30}
            style={{
              labels: { fill: '#333', fontSize: 12, fontWeight: 'bold' },
            }}
          />
          <Text style={tw`text-gray-700 mt-2`}>
            Weekly Goal: {achieved}/{goal} tasks completed
          </Text>
        </View>
      </View>

      {/* Goal Setting */}
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold mb-3`}>Set Your Weekly Goal:</Text>
        <TextInput
          style={tw`p-3 border rounded-lg mb-3 bg-white`}
          placeholder="Enter goal (e.g., 10)"
          keyboardType="numeric"
          onChangeText={handleSetGoal}
        />
        <TouchableOpacity
          style={tw`p-3 bg-blue-600 rounded-lg`}
          onPress={() => alert(`Weekly goal set to ${goal} tasks! 🎉`)}
        >
          <Text style={tw`text-center text-white font-bold`}>Set Goal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default ProgressTrackingScreen;
