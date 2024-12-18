import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://abuntzklefmatwofckrx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFidW50emtsZWZtYXR3b2Zja3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MzY4NTIsImV4cCI6MjA0ODExMjg1Mn0.ouCDJZ6f8l1vVvjk26iOR8NXNrjxxUvpptgTwmvR2PI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})


// unitconverter
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = "https://gnjhcdsmcloijunbdmwo.supabase.co"
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduamhjZHNtY2xvaWp1bmJkbXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNTkzODcsImV4cCI6MjA0ODYzNTM4N30.rVxs_o531ywcRKTNEMWoDMAFd2knxIrQGMLH9-CwzKw"

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// })

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { supabase } from './supabase'; // Adjust the path to your file

// const App = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // States for new data input
//   const [city, setCity] = useState('');
//   const [name, setName] = useState('');

//   const fetchData = async () => {
//     try {
//       const { data: items, error } = await supabase
//         .from('Unit') // Replace with your table name
//         .select('*');
//       if (error) {
//         console.error(error);
//       } else {
//         setData(items);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addData = async () => {
//     if (!city || !name) {
//       Alert.alert('Validation Error', 'Both fields are required');
//       return;
//     }
  
//     try {
//       const { error } = await supabase.from('Unit').insert([
//         {
//           city,
//           name,
//         },
//       ]);
//       if (error) {
//         console.error(error);
//         Alert.alert('Error', 'Failed to add data');
//       } else {
//         Alert.alert('Success', 'Data added successfully');
//         fetchData(); // Refresh data after adding new entry
//         setCity('');
//         setName('');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>City: {item.city}</Text>
//       <Text style={styles.title}>Name: {item.name}</Text>
//       <Text style={styles.title}>ID: {item.id}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Add New Data</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter City"
//         value={city}
//         onChangeText={(text) => setCity(text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Name"
//         value={name}
//         onChangeText={(text) => setName(text)}
//       />
//       <Button title="Add Data" onPress={addData} />

//       <Text style={styles.heading}>Data List</Text>
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   item: {
//     padding: 16,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 16,
//   },
// });

// export default App;


