import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';


const Login = ({ navigation }) => {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async() => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        const user = userData.users.find(
          (user) => user.username === username && user.password === password
        );

        if (user) {
          navigation.navigate('Checkin', { user });
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } else {
        alert('Failed to fetch user data. Please try again later.');
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Newton</Text>
      <Text style={styles.subheader}>Logga in på Newton</Text>
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
    position: 'elative',
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
  subheader: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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
