
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Navbar;
