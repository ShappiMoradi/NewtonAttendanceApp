import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AppAuth from 'react-native-app-auth';
import { microsoftConfig } from '../Config';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);

    try {
      const result = await AppAuth.authorize(microsoftConfig);
      setAccessToken(result.accessToken);

      // Handle successful authentication
      console.log('Authentication successful:', result);

      // Navigate to the Checkin screen with the access token
      navigation.navigate('Checkin', { accessToken });
    } catch (error) {
      setIsLoading(false);
      console.error('Microsoft Entra ID authentication error:', error);
      // Handle authentication error
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Authenticating...</Text>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Newton</Text>
          <Text style={styles.subheader}>Log in to Newton</Text>
          <Button title="Log in with Microsoft Entra ID" onPress={handleMicrosoftLogin} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginContainer: {
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  subheader: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Login;
