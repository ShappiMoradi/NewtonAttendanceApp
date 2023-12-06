import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import { authorize } from 'react-native-app-auth';
import usersData from '../db.json';


const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Loading the user data into the state
    setUsers(usersData.users);
  }, []);

  const handleLogin = async () => {
    if (users.length === 0) {
      alert('Inga användare hittades');
      return;
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      navigation.navigate('Checkin', { name: user.name, class: user.class, city: user.city });
    } else {
      alert('Ogiltigt användarnamn eller lösenord, försök igen');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Newton</Text>
    <Text style={styles.subheader}>Logga in på Newton</Text>
      <TextInput
        style={styles.input}
        placeholder="Användarnamn"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
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
    top: 50,
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