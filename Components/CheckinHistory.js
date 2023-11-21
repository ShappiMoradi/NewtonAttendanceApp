import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckinHistory = () => {
  const [checkinsHistory, setCheckinsHistory] = useState([]);

  useEffect(() => {
    // Fetch check-in history when the component mounts
    fetchCheckinsHistory();
  }, []);

  const fetchCheckinsHistory = async () => {
    try {
      // Retrieve check-ins from AsyncStorage
      const storedCheckins = await AsyncStorage.getItem('checkins');
      
      if (storedCheckins) {
        const checkins = JSON.parse(storedCheckins);
        setCheckinsHistory(checkins);
      }
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    }
  };

  const renderCheckinItem = ({ item }) => (
    <View style={styles.checkinItem}>
    <Text style={styles.dateTime}>{item.dateTime}</Text>
    <Text style={styles.status}>{item.status}</Text>
  </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Incheckningshistorik</Text>
      {checkinsHistory.length > 0 ? (
        <FlatList
          data={checkinsHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCheckinItem}
        />
      ) : (
        <Text>Inga incheckningar registrerade ännu.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 50,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    checkinItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#eee', // Add a background color for better visibility
      borderRadius: 5,
      width: '80%', // Adjust the width as needed
    },
    dateTime: {
      fontSize: 16,
    },
    status: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007BFF', // Add a custom color for status
    },
  });
  

export default CheckinHistory;
