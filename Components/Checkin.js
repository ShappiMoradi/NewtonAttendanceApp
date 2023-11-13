import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Checkin = ({ route }) => {
  const { username } = route.params;
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTimeString = `${date} - ${time}`;
    setDateTime(dateTimeString);
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Newton</Text>
      <Text style={styles.Text}>Welcome, {username}!</Text>
      <Text>Checka in/ut</Text>
      <View>
        <Button title="IN" />
        <Button title="UT" />
      </View>
      <Text style={styles.paragraph}>{dateTime}</Text>
      <Text ></Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute',
    color: 'orange',
    top: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});

export default Checkin;
