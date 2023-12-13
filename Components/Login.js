import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { authorize } from 'react-native-app-auth';
import usersData from '../db.json';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      navigation.navigate('Checkin', { name: user.name, class: user.class, city: user.city });
    } else {
      alert('Ogiltigt användarnamn eller lösenord, försök igen');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./Image/Newton-logo.png')} 
        style={styles.logoImage}/>
      <Text style={styles.header}>Newton</Text>
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
      <TouchableOpacity
      style={styles.loginButton}
      onPress={handleLogin}
      >
      <Text style ={styles.LoginButtonText}>Logga in</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
    padding: '16',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  header: {
    fontSize: 36,
    color: 'orange',
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  subheader: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  textAlign: 'center',
  },
  input: {
    backgroundColor:'white',
    borderRadius:'8',
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
  },

  logoImage:{
   width:120,
   height:120,
   marginBottom:40,
  },

  loginButton: {
  backgroundColor: 'green',
  borderRadius: 25,
  paddingHorizontal: 24,
  paddingVertical: 12,
  marginTop:20,
  },

  LoginButtonText: {
    fontSize: 16,
  color:'white',
  textAlign: 20,
  }
});

export default Login;
