import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {AuthLoginForm} from "../components/login-form/AuthLoginForm";
import {AuthSignupForm} from "../components/signup-form/AuthSignupForm";
import {s} from "../../../styles/config";

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
                <View style={{ alignContent: 'flex-end', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: focused ? s.blue : '#A9A9A9'}}>
                        {route.title}
                    </Text>
                </View>
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
