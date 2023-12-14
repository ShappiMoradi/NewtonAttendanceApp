import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
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
      <Text style={styles.status}>
        {item.status === 'IN' ? <Text style={{ color: '#32CD32' }}>IN</Text> : <Text style={{ color: '#FF8C00' }}>UT</Text>}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoAndHeader}>
        <Text style={styles.header}>Newton</Text>
        <Image
          source={require('./Image/Newton.png')}
          style={styles.logoImage}
        />
      </View>
      <Text style={styles.subheader}>Incheckningshistorik</Text>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
    padding: 16,
  },
  logoAndHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f7aa4b',
  },
  subheader: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff6df',
  },
  checkinItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    //borderRadius: 8,
    width: '84%',
  },
  dateTime: {
    fontSize: 16,
    color: '#333',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoImage: {
    width: 50,
    height: 50,
    marginLeft: 5,
  },
});

export default CheckinHistory;
