import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Checkin from './Components/Checkin';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
   <Login />
  </NavigationContainer>
  );
  
}
