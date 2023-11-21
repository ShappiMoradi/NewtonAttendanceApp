import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Checkin from './Components/Checkin';
import CheckinHistory from './Components/CheckinHistory'


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Checkin" component={Checkin} options={{ headerShown: false }}/>
      <Stack.Screen name="CheckinHistory" component={CheckinHistory} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
