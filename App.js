import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import  Navigation  from './src/navigation'
import { AuthenticationContextProvider } from "./service/context";
import { View, Text } from 'react-native';
import SplashScreen from './src/screens/SplashScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>

  );
}
