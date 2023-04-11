import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {AuthLoginForm} from "../components/login-form/AuthLoginForm";
import {AuthSignupForm} from "../components/signup-form/AuthSignupForm";
import {s} from "../../../../App";

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
            indicatorStyle={{ backgroundColor: s.blue }}
            style={{ backgroundColor: s.white }}
            renderLabel={({ route, focused }) => (
                // @ts-ignore
                <Text style={{ color: focused ? s.blue : '#A9A9A9', transform: focused ? 'translate(10px, 10px)' : 'none' }}>
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
