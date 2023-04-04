import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ChannelsCard} from "../components/card/ChannelsCard";
import {useQuery} from "@apollo/client";
import {CHANNELS_BY_ID_QUERY} from "../api/ChannelsById.api";

export default function ChannelsDetailsScreen({ navigation, route }) {
    const { id } = route.params

    const { loading, error, data } = useQuery(CHANNELS_BY_ID_QUERY, {
        variables: { id },
    });

    useEffect(() => {
        const title = data?.channel?.title || ''
        navigation.setOptions({ title: `Канал ${title}` });
    }, [navigation, data, loading]);


    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
        <View style={styles.container}>
            <ChannelsCard {...data.channel} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
