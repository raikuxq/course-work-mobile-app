import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChannelsCreate } from '../components/create/ChannelsCreate';
import { ChannelsJoin } from '../components/join/ChannelsJoin';
import { ChannelsList } from '../components/list/ChannelsList';

export default function ChannelsScreen({ navigation }) {
    useEffect(() => {
        navigation.setOptions({ title: 'Список каналов' });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ChannelsList />
            <Text>{'\n\n'}</Text>
            <ChannelsCreate />
            <Text>{'\n\n'}</Text>
            <ChannelsJoin />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
