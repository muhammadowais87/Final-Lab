import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import tw from 'twrnc';
import { supabase } from './supabase';

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [performance, setPerformance] = useState([]); // Tracks quiz results

  // Fetch quizzes from Supabase
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data, error } = await supabase
          .from('Quizzes')
          .select('*');

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setQuizzes(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSubmitAnswer = (quizId, correct) => {
    const isCorrect = userAnswer.trim().toLowerCase() === correct.toLowerCase();
    Alert.alert(
      'Result',
      isCorrect ? 'Correct Answer! 🎉' : 'Wrong Answer. Try Again!',
    );

    // Update performance
    setPerformance((prev) => [
      ...prev,
      { quizId, status: isCorrect ? 'Correct' : 'Incorrect' },
    ]);
    setUserAnswer('');
  };

  const handleAddQuiz = async () => {
    // Validate input
    if (!title || !question || !correctAnswer) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const { data, error } = await supabase.from('Quizzes').insert([
        {
          title,
          question,
          correctAnswer,
        },
      ]);

      if (error) {
        Alert.alert('Error', 'Failed to add quiz');
        console.error('Error inserting quiz:', error);
      } else {
        Alert.alert('Success', 'Quiz added successfully');
        setTitle('');
        setQuestion('');
        setCorrectAnswer('');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={tw`flex-1 bg-indigo-900`}>      
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tw`p-4 bg-indigo-800 rounded-xl shadow-md m-3`}>            
            <View>
              <Text style={tw`text-lg font-bold text-white mb-2`}>{item.title}</Text>
              <Text style={tw`text-sm text-gray-200 mb-4`}>{item.question}</Text>

              <TextInput
                style={tw`p-2 border border-gray-300 rounded bg-white mb-3`}
                placeholder="Your Answer"
                value={userAnswer}
                onChangeText={setUserAnswer}
              />

              <TouchableOpacity
                onPress={() => handleSubmitAnswer(item.id, item.correctAnswer)}
                style={tw`bg-orange-500 px-4 py-2 rounded shadow-md`}
              >
                <Text style={tw`text-white text-sm text-center font-bold`}>Submit Answer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Input Fields for New Quiz */}
      <View style={tw`p-4 bg-white rounded-t-3xl shadow-lg`}>        
        <TextInput
          style={tw`p-2 mb-3 border border-gray-300 rounded`}
          placeholder="Quiz Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={tw`p-2 mb-3 border border-gray-300 rounded`}
          placeholder="Quiz Question"
          value={question}
          onChangeText={setQuestion}
        />
        <TextInput
          style={tw`p-2 mb-3 border border-gray-300 rounded`}
          placeholder="Correct Answer"
          value={correctAnswer}
          onChangeText={setCorrectAnswer}
        />
        <TouchableOpacity
          onPress={handleAddQuiz}
          style={tw`bg-green-500 px-4 py-3 rounded shadow-md`}
        >
          <Text style={tw`text-white text-sm text-center font-bold`}>Add Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Performance Analytics */}
      {performance.length > 0 && (
        <View style={tw`p-4 bg-yellow-50`}>          
          <Text style={tw`text-lg font-bold mb-2`}>Performance Analytics:</Text>
          {performance.map((result, index) => (
            <Text key={index} style={tw`text-sm text-gray-600`}>
              Quiz {result.quizId}: {result.status}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

export default Quizzes;