import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login } from './msalConfig';

const Login = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const authResult = await login(msalConfig);
      if (authResult.status === 'success') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Newton</Text>
      <Text style={styles.subheader}>Logga in</Text>
      <TextInput
        style={styles.input}
        placeholder="Användarnamn"
      />
      <TextInput
        style={styles.input}
        placeholder="Lösenord"
      />
      <Button title="Logga in" onPress={handleLogin} />
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
