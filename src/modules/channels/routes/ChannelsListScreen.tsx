import React, { useEffect } from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { ChannelsList } from '../components/list/ChannelsList';

export default function ChannelsListScreen({ navigation }) {
    useEffect(() => {
        navigation.setOptions({ title: 'Список каналов' });
    }, [navigation]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <ChannelsList />
            </View>
        </ScrollView>

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
