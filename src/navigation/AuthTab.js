import React from "react";
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from '../screens/SplashScreen'

const Stack = createStackNavigator();

const AuthTab = () => (
    <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }}
    >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
)

export default AuthTab;