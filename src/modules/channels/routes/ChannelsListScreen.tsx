import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View, RefreshControl} from 'react-native';
import { ChannelsList } from '../components/list/ChannelsList';
import {useQuery} from "@apollo/client";
import { CHANNELS_LIST_SHORT_QUERY } from '../api/ChannelsList.api';

export default function ChannelsListScreen({ navigation, route }) {

    const { loading, error, data, refetch } = useQuery(CHANNELS_LIST_SHORT_QUERY);
    const [refreshing, setRefreshing] = useState(false);


    const computedData = useMemo(() => {
        if (!data) {
            return [];
        }

        return Array.from(new Set([
            ...data.userChannelsOwn,
            ...data.userChannelsMemberOf.map(
                (userChannel) => userChannel.channel
            )
        ]));
    }, [data]);


    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };


    useEffect(() => {
        navigation.setOptions({ title: 'Список каналов' });
    }, [navigation]);

    useEffect(() => {
        refetch();
    }, [route])

    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text>Ошибка :(</Text>;
    if (!computedData?.length) return <Text>Здесь появится список каналов, в которых вы являетесь автором или участником.</Text>

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                <ChannelsList
                    computedData={computedData}
                    onDelete={refetch}
                />
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
