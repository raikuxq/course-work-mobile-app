import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useQuery} from "@apollo/client";
import {TRACKERS_BY_ID_QUERY} from "../../trackers/api/TrackersById.api";

export default function TrackersDetailsScreen({ navigation, route }) {

    const { id } = route.params

    const { loading, error, data } = useQuery(TRACKERS_BY_ID_QUERY, {
        variables: { id },
    });

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        const title = data?.tracker?.title || ''
        navigation.setOptions({ title: `Трекер: ${title}` });
    }, [navigation, data]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
        <View style={styles.container}>
            <Text>{'\nТрекер\n'}</Text>
            <Text>{data.toString()}</Text>
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
