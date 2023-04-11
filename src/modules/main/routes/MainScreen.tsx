import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ChannelsJoin} from "../../channels/components/join/ChannelsJoin";
import {ChannelsCreate} from "../../channels/components/create/ChannelsCreate";

export default function MainScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({ title: 'Главная' });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ChannelsJoin />
            <Text>{'\n'}</Text>
            <ChannelsCreate />
            <Text>{'\n'}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});
