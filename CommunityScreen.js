import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import tw from 'twrnc';

function CommunityScreen() {
  const [studyGroups, setStudyGroups] = useState([
    { id: 1, name: 'Math Study Group' },
    { id: 2, name: 'Physics Enthusiasts' },
    { id: 3, name: 'Programming Wizards' },
  ]);

  const [forumPosts, setForumPosts] = useState([
    { id: 1, title: 'Tips for Time Management', author: 'Alice' },
    { id: 2, title: 'Understanding Calculus', author: 'Bob' },
  ]);

  const [newPost, setNewPost] = useState('');
  const [resources, setResources] = useState([]);

  const handleJoinGroup = (groupName) => {
    Alert.alert('Group Joined', `You have joined the ${groupName}! 🎉`);
  };

  const handleAddResource = (newResource) => {
    if (newResource.trim() === '') {
      Alert.alert('Error', 'Resource cannot be empty.');
      return;
    }
    setResources([...resources, newResource]);
    setNewPost('');
    Alert.alert('Resource Shared', 'Your resource has been shared successfully!');
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-blue-900 py-4`}>
        <Text style={tw`text-white text-center text-xl font-bold`}>
          Community & Collaboration
        </Text>
      </View>

      {/* Study Groups */}
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Study Groups:</Text>
        <FlatList
          data={studyGroups}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-3 mb-2 bg-green-300 rounded-lg`}
              onPress={() => handleJoinGroup(item.name)}
            >
              <Text style={tw`text-gray-800 font-bold`}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Discussion Forum */}
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Discussion Forum:</Text>
        <FlatList
          data={forumPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tw`p-3 mb-2 bg-blue-300 rounded-lg`}>
              <Text style={tw`text-gray-800 font-bold`}>{item.title}</Text>
              <Text style={tw`text-sm text-gray-600`}>By {item.author}</Text>
            </View>
          )}
        />
        {/* Add New Forum Post */}
        <Text style={tw`text-lg font-bold mt-4 mb-2`}>Share a Note or Resource:</Text>
        <TextInput
          style={tw`p-3 border rounded-lg mb-3 bg-white`}
          placeholder="Share a link or a note..."
          value={newPost}
          onChangeText={setNewPost}
        />
        <TouchableOpacity
          style={tw`p-3 bg-purple-600 rounded-lg`}
          onPress={() => handleAddResource(newPost)}
        >
          <Text style={tw`text-center text-white font-bold`}>Share Resource</Text>
        </TouchableOpacity>
      </View>

      {/* Shared Resources */}
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Shared Notes & Resources:</Text>
        {resources.length > 0 ? (
          resources.map((resource, index) => (
            <View
              key={index}
              style={tw`p-3 mb-2 bg-yellow-200 rounded-lg`}
            >
              <Text style={tw`text-gray-800`}>{resource}</Text>
            </View>
          ))
        ) : (
          <Text style={tw`text-gray-600`}>No resources shared yet.</Text>
        )}
      </View>
    </ScrollView>
  );
}

export default CommunityScreen;
