import React from 'react';
import { View, StyleSheet, Text, Button, } from 'react-native';
import { authorize } from 'react-native-app-auth';

const Login = ({ navigation }) => {
  const microsoftConfig = {
    issuer: 'https://login.microsoftonline.com/74ac9228-53f2-4ced-b479-b365b689ece2/v2.0/.well-known/openid-configuration',
    clientId: 'ab5e393b-aab9-4c48-b5e8-5529225b02b7',
    redirectUrl: 'http://localhost:3000',
    scopes: ['openid', 'profile', 'User.Read'],
    additionalParameters: { prompt: 'login' },
  };

  const handleMicrosoftLogin = async () => {
    try {
      const result = await authorize(microsoftConfig);
      navigation.navigate('Checkin', { accessToken: result.accessToken });
    } catch (error) {
      console.error('Microsoft Entra ID authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Newton</Text>
      <Text style={styles.subheader}>Logga in på Newton</Text>
      <Button title="Logga in med Microsoft Entra ID" onPress={handleMicrosoftLogin} />
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
    color: 'orange',
  },
  subheader: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Login;
