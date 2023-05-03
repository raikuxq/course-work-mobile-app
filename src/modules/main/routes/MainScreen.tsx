import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {ChannelsJoin} from "../../channels/components/join/ChannelsJoin";
import {ChannelsCreate} from "../../channels/components/create/ChannelsCreate";
import {s} from "../../../styles/config";

export default function MainScreen({ navigation }) {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'join', title: 'Присоединиться' },
        { key: 'create', title: 'Создать канал' },
    ]);

    const renderScene = SceneMap({
        join: ChannelsJoin,
        create: ChannelsCreate,
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
        navigation.setOptions({ title: 'Главная' });
    }, [navigation]);

    return (
        <View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </View>
    );
}
