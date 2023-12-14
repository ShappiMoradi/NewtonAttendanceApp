import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
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
      <View style={styles.logoAndHeader}>
        <Text style={styles.header}>Newton</Text>
        <Image
          source={require('./Image/Newton-logo.png')}
          style={styles.logoImage}
        />
      </View>
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
    backgroundColor: '#ffbd00',
    padding: '16',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoAndHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    justifyContent: 'top',
    marginTop: -300,
    marginBottom: 150,
  },
  header: {
    fontSize: 45,
    color: '#f69e32',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    color: '#fff6df',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
  },

  logoImage: {
    width: 50,
    height: 50,
    marginBottom: 40,
    marginLeft: 5,
  },

  loginButton: {
    backgroundColor: 'green',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 20,
  },

  LoginButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  }
});

export default Login;
