/* eslint-disable prettier/prettier */
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FormScreen from '../screens/FormScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#BF6B7B',
                tabBarIcon: ({ color }) => (
                    <Icon name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Form"
            component={FormScreen}
            options={{
                tabBarLabel: 'BookMark',
                tabBarColor: '#A67772',
                tabBarIcon: ({ color }) => (
                    <Icon name="bookmark-outline" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Details"
            component={DetailsScreen}
            options={{
                tabBarLabel: 'Details',
                tabBarColor: '#F2A2B1',
                tabBarIcon: ({ color }) => (
                    <Icon name="notifications" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
                tabBarLabel: 'BookMark',
                tabBarColor: '#A67772',
                tabBarIcon: ({ color }) => (
                    <Icon name="bookmark-outline" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

