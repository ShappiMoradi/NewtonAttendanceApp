import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

const App = () => {

  return (
  // <View style={styles.container}>
  //     <Login />
  //   </View>
  <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};


export default App;
