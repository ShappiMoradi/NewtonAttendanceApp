import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
      try {
        
        const response = await fetch('http://localhost:3001/users');
        const userData = await response.json();

        const user = userData.users.find(
            (user) => user.username === username && user.password === password
        );
    
        if (user) {
            navigation.navigate('Checkin');
        } else {
            alert('Login failed. Please check your credentails.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logga in på Newton</Text>
      <TextInput
        style={styles.input}
        placeholder="Användarnamn"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
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
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default Login;
