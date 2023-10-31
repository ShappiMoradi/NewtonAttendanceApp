import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Checkin from './Components/Checkin';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Checkin" component={Checkin} /> 
    </Stack.Navigator>
  );
}

export default AppNavigator;
