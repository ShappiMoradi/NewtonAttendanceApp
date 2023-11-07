import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Checkin = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user.username}!</Text>
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
});

export default Checkin;
