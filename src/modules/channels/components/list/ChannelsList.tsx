import { useQuery } from '@apollo/client';
import React, {useEffect} from 'react';
import { FlatList, Text } from 'react-native';
import { CHANNELS_LIST_SHORT_QUERY } from '../../api/ChannelsList.api';

export const ChannelsList = () => {
    const { loading, error, data } = useQuery(CHANNELS_LIST_SHORT_QUERY);

    useEffect(() => {
        console.log('CHANNELS DATA')
        console.log(data)
    }, [data])

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
        <FlatList
            data={data.userChannels}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            keyExtractor={(item) => item.id}
        />
    );
}
