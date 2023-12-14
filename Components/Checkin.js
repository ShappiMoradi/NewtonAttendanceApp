import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Checkin = ({ route }) => {
  const navigation = useNavigation();
  const { name, class: userClass, city } = route.params;
  const [dateTime, setDateTime] = useState(null);
  const [checkinsData, setCheckinsData] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  
  useEffect(() => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTimeString = `${date} - ${time}`;
    setDateTime(dateTimeString);

    // Is automatically checked out after 17:30
    const checkOutTime = new Date(date + ' 17:30:00').getTime();
    if (today.getTime() >= checkOutTime && !isCheckedIn) {
      handleCheckIn('UT');
    }
  }, []);

  useEffect(() => {
    console.log('Updated Check-in Data:', checkinsData);
    saveCheckins();
  }, [checkinsData]);

  useEffect(() => {
    // A timeout to automatically check out the user at 17:30
    const today = new Date();
    const checkOutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 30, 0).getTime();
    const timeUntilCheckOut = checkOutTime - today.getTime();

    const checkOutTimeout = setTimeout(() => {
      if (isCheckedIn) {
        handleCheckIn('UT');
      }
    }, timeUntilCheckOut);

    // Clear the timeout when the component unmounts or when the user manually checks out
    return () => clearTimeout(checkOutTimeout);
  }, [isCheckedIn]);

  const saveCheckins = async () => {
    try {
      // Ensure checkinsData is an array before saving
      const checkinsArray = Array.isArray(checkinsData) ? checkinsData : [];

      await AsyncStorage.setItem('checkins', JSON.stringify(checkinsArray));

      // Update isCheckedIn based on the latest check-in data
      const latestCheckin = checkinsArray[checkinsArray.length - 1];
      setIsCheckedIn(latestCheckin?.status === 'IN');
    } catch (error) {
      console.error('Error saving checkins:', error);
    }
  };

  const handleCheckIn = async (status) => {
    // If the user is checking OUT, validate that they have previously checked IN
    if (status === 'UT' && !isCheckedIn) {
      Alert.alert('Fel', 'Du måste checka IN innan du kan checka UT');
      return;
    }

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
        <View style={styles.logoAndHeader}>
        <Text style={styles.header}>Newton</Text>
        <Image
          source={require('./Image/Newton-logo.png')}
          style={styles.logoImage}
        />
      </View>
        <Text style={styles.subheader}>Checka in/ut</Text>
        <View style={styles.centeredContent}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.inButton]}
              onPress={() => handleCheckIn('IN')}
            >
              <Text style={styles.buttonText}>IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.outButton, !isCheckedIn && styles.disabledButton]}
              onPress={() => handleCheckIn('UT')}
              disabled={!isCheckedIn}
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
            <Text style={styles.buttonText}>Incheckningshistorik</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffbd00',
    padding: 16,
  },
  logoAndHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: -150,
    //justifyContent: 'top',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 20, 
    color: '#f69e32',
  },
  subheader: {
    fontSize: 28,
    marginBottom: 10, 
    marginTop: 10,
    color: '#fff6df', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 50,
    marginRight: -50,
  },
  button: {
    marginVertical: -10,
    borderRadius: 5,
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  inButton: {
    backgroundColor: '#32CD32', 
    marginRight: 0,
  },
  outButton: {
    backgroundColor: '#FF8C00', 
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
    color: 'white',
  },
  userInfo: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    color: 'white',
  },
  historyButton: {
    marginTop: 20,
    backgroundColor: '#32CD32', 
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  logoImage: {
    width: 50,
    height: 50,
    marginBottom: 40,
    marginLeft: 5,
  },
});

export default Checkin;