import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashStack"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen name="SplashStack" component={SplashScreen} />
        <Stack.Screen name="SignInStack" component={SignInScreen}
          screenOptions={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
