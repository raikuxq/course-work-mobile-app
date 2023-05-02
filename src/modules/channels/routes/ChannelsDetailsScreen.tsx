import React, {useEffect, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChannelsCard} from "../components/card/ChannelsCard";
import {useQuery} from "@apollo/client";
import {CHANNELS_BY_ID_QUERY} from "../api/ChannelsById.api";
import {TrackersCreateForm} from "../../trackers/components/TrackersCreateForm";
import {useSelector} from "react-redux";

export default function ChannelsDetailsScreen({navigation, route}) {
    const {id} = route.params

    // @ts-ignore
    const userId = useSelector((state) => state.auth?.user?.id);

    const {loading, error, data} = useQuery(CHANNELS_BY_ID_QUERY, {
        variables: {id},
    });

    const categoryId = useMemo<string | null>(() => {
        return data?.channel?.categories?.[0]?.id || null
    }, [data])

    const channelId = useMemo<string | null>(() => {
        return data?.channel?.id || null
    }, [data])

    useEffect(() => {
        const title = data?.channel?.title || ''
        navigation.setOptions({title: `Канал ${title}`});
    }, [navigation, data, loading]);


    if (loading) return <Text>Загрузка...</Text>;
    if (error) return <Text>Ошибка :(</Text>;

    return (
        <View style={styles.container}>
            <ChannelsCard {...data.channel} />
            {
                userId === data.channel.author.id && (
                    <>
                        <Text>{'\n\n'}</Text>
                        <TrackersCreateForm
                            channelCategoryId={categoryId}
                            channelId={channelId}
                        />
                    </>
                )
            }
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
