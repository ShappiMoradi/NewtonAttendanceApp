import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Checkin = ({ route }) => {
  const navigation = useNavigation();
  const { name, class: userClass, city } = route.params;
  const [dateTime, setDateTime] = useState(null);
  const [checkinsData, setCheckinsData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTimeString = `${date} - ${time}`;
    setDateTime(dateTimeString);
  }, []);

  useEffect(() => {
    // This effect will run whenever checkinsData changes
    console.log('Updated Check-in Data:', checkinsData);
    saveCheckins();
  }, [checkinsData]);

  const saveCheckins = async () => {
    try {
      // Ensure checkinsData is an array before saving
      const checkinsArray = Array.isArray(checkinsData) ? checkinsData : [];

      await AsyncStorage.setItem('checkins', JSON.stringify(checkinsArray));
    } catch (error) {
      console.error('Error saving checkins:', error);
    }
  };

  const handleCheckIn = async (status) => {
    // Prepare the check-in data
    const checkinData = {
      name,
      class: userClass,
      city,
      dateTime,
      status,
    };

    // Update state immediately
    setCheckinsData((prevCheckins) => [...prevCheckins, checkinData]);

    await saveCheckins();

    // Show an alert
    if (status === 'IN') {
      Alert.alert(
        'Incheckningen lyckades',
        'Du har checkat IN',
        [
          {
            text: 'OKEJ',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    } else if (status === 'UT') {
      Alert.alert(
        'Utcheckning lyckad',
        'Du har checkat UT',
        [
          {
            text: 'OKEJ',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const navigateToCheckinHistory = () => {
    // Navigate to the CheckinHistory screen
    navigation.navigate('CheckinHistory');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Newton</Text>
      <Text style={styles.subheader}>Checka in/ut</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.inButton]}
          onPress={() => handleCheckIn('IN')}
        >
          <Text style={styles.buttonText}>IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.outButton]}
          onPress={() => handleCheckIn('UT')}
        >
          <Text style={styles.buttonText}>UT</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.paragraph}>{dateTime}</Text>
      <View>
        <Text style={styles.userInfo}>Namn: {name}</Text>
        <Text style={styles.userInfo}>Klass: {userClass}</Text>
        <Text style={styles.userInfo}>Ort: {city}</Text>
      </View>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={navigateToCheckinHistory}
      >
        <Text style={styles.buttonText}>Check-in History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute',
    color: 'orange',
    top: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  button: {
    marginVertical: 10,
    borderRadius: 5,
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inButton: {
    backgroundColor: 'green',
  },
  outButton: {
    backgroundColor: 'orange',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 22,
    marginTop: 10,
  },
  userInfo: {
    fontSize: 18,
    marginTop: 10,
  },
  historyButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
});

export default Checkin;
