import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ChannelsJoin} from "../../channels/components/join/ChannelsJoin";
import {ChannelsCreate} from "../../channels/components/create/ChannelsCreate";

export default function MainScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({ title: 'Главная' });
    }, [navigation]);

    return (
        <View>
            <ChannelsJoin />
            <Text>{'\n'}</Text>
            <ChannelsCreate />
            <Text>{'\n'}</Text>
        </View>
    );
}
