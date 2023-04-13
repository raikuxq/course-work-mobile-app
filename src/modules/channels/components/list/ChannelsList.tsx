import { useQuery } from '@apollo/client';
import React, {useMemo} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CHANNELS_LIST_SHORT_QUERY } from '../../api/ChannelsList.api';

export const ChannelsList = () => {
    const { loading, error, data } = useQuery(CHANNELS_LIST_SHORT_QUERY);
    const navigation = useNavigation();

    const computedData = useMemo(() => {
        if (!data) {
            return []
        }

        return [
            ...data.userChannelsOwn,
            ...data.userChannelsMemberOf.map(userChannel => userChannel.channel)
        ]
    }, [data])

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
        <View>
            <FlatList
                data={computedData}
                renderItem={({ item }) => (
                    /* @ts-ignore */
                    <TouchableOpacity onPress={() => navigation.navigate('ChannelDetails', { id: item.id })}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>

    );
}
