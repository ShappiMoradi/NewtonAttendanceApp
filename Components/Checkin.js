import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import checkins from '../checkins.json';

const Checkin = ({ route }) => {
  const { name, class: userClass, city } = route.params;
  const [dateTime, setDateTime] = useState(null);
  const [checkinsData, setCheckinsData] = useState(checkins);

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
  }, [checkinsData]);


  const handleCheckIn = (status) => {
    // Prepare the check-in data
    const checkinData = {
      name,
      class: userClass,
      city,
      dateTime,
      status, // "IN" or "OUT"
    };

    //checkins.push(checkinData);
    setCheckinsData((prevCheckins) => [...prevCheckins, checkinData]);

    //console.log('Updated Check-in Data:', checkinsData);
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
});

export default Checkin;
