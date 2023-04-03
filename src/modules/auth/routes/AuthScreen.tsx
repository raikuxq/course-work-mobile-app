import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {AuthLoginForm} from "../components/login-form/AuthLoginForm";
import {AuthSignupForm} from "../components/signup-form/AuthSignupForm";

const AuthScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'login', title: 'Войти' },
        { key: 'register', title: 'Регистрация' },
    ]);

    const renderScene = SceneMap({
        login: AuthLoginForm,
        register: AuthSignupForm,
    });

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FFFFFF' }}
            style={{ backgroundColor: '#6200EE' }}
            renderLabel={({ route, focused }) => (
                // @ts-ignore
                <Text style={{ color: focused ? '#FFFFFF' : '#A9A9A9' }}>
                    {route.title}
                </Text>
            )}
        />
    );

    useEffect(() => {
        navigation.setOptions({ title: 'Авторизация' });
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

export default AuthScreen;
