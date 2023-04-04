import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthScreen from '../../../modules/auth/routes/AuthScreen';
import MainScreen from "../../../modules/main/routes/MainScreen";
import ProfileScreen from "../../../modules/profile/route/ProfileScreen";
import ChannelsScreen from "../../../modules/channels/routes/ChannelsScreen";
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={"Auth"}>
                <Tab.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{
                        title: 'Авторизация',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="login" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Main"
                    component={MainScreen}
                    options={{
                        title: 'Главная',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Channels"
                    component={ChannelsScreen}
                    options={{
                        title: 'Каналы',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="view-list" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        title: 'Профиль',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
