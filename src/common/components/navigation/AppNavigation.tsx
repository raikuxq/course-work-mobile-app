import React, {useCallback, useEffect, useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AuthScreen from '../../../modules/auth/routes/AuthScreen';
import MainScreen from "../../../modules/main/routes/MainScreen";
import ProfileScreen from "../../../modules/profile/route/ProfileScreen";
import ChannelsScreen from "../../../modules/channels/routes/ChannelsScreen";
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@apollo/client";
import {PROFILE_INFO_QUERY} from "../../../modules/profile/api/ProfileInfoQuery.api";
import {setUser} from "../../../modules/auth/store/auth";
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

function AppNavigation() {
    const dispatch = useDispatch();

    // @ts-ignore
    const userId = useSelector((state) => state.auth?.user?.id);

    const isAuthorized = Boolean(userId)

    const {loading: loadingAuth, data: dataAuth} = useQuery(PROFILE_INFO_QUERY);

    const isGlobalLoading = useMemo(() => {
        return loadingAuth
    }, [loadingAuth])

    const logout = useCallback(async () => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        dispatch(setUser(null))
        // @ts-ignore
        // navigation.navigate("Auth");
    }, [])

    /**
     * Auth init
     */
    useEffect(() => {
        if (dataAuth) {
            dispatch(setUser(dataAuth?.userCurrent));
        }
    }, [dataAuth])

    if (isGlobalLoading) {
        return <ActivityIndicator/>
    }

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={"Auth"}>
                {
                    isAuthorized ? (
                        <>
                            <Tab.Screen
                                name="Main"
                                component={MainScreen}
                                options={{
                                    title: 'Главная',
                                    tabBarIcon: ({color, size}) => (
                                        <MaterialCommunityIcons name="home" color={color} size={size}/>
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Channels"
                                component={ChannelsScreen}
                                options={{
                                    title: 'Каналы',
                                    tabBarIcon: ({color, size}) => (
                                        <MaterialCommunityIcons name="view-list" color={color} size={size}/>
                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Profile"
                                component={ProfileScreen}
                                options={{
                                    title: 'Профиль',
                                    tabBarIcon: ({color, size}) => (
                                        <MaterialCommunityIcons name="account" color={color} size={size}/>

                                    ),
                                }}
                            />
                            <Tab.Screen
                                name="Logout"
                                component={React.Fragment}
                                options={{
                                    title: 'Выход',
                                    tabBarIcon: ({color, size}) => (
                                        <MaterialCommunityIcons
                                            name="logout"
                                            color={color}
                                            size={size}
                                            onPress={async (event) => {
                                                event.preventDefault()
                                                await logout();
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </>
                    ) : (
                        <Tab.Screen
                            name="Auth"
                            component={AuthScreen}
                            options={{
                                title: 'Авторизация',
                                tabBarIcon: ({color, size}) => (
                                    <MaterialCommunityIcons name="login" color={color} size={size}/>
                                ),
                            }}
                        />
                    )
                }


            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
