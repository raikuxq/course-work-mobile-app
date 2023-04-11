import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CHANNELS_LIST_SHORT_QUERY } from '../../api/ChannelsList.api';

export const ChannelsList = () => {
    const { loading, error, data } = useQuery(CHANNELS_LIST_SHORT_QUERY);
    const navigation = useNavigation();

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
        <FlatList
            data={data.userChannels}
            renderItem={({ item }) => (
                /* @ts-ignore */
                <TouchableOpacity onPress={() => navigation.navigate('ChannelDetails', { id: item.id })}>
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}
