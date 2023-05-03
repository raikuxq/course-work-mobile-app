import React, {useEffect, useMemo, useState} from 'react';
import {Button, RefreshControl, ScrollView, Text, View} from 'react-native';
import {ChannelsCard} from "../components/card/ChannelsCard";
import {useQuery} from "@apollo/client";
import {CHANNELS_BY_ID_QUERY} from "../api/ChannelsById.api";
import {TrackersCreateForm} from "../../trackers/components/TrackersCreateForm";
import {useSelector} from "react-redux";


export default function ChannelsDetailsScreen({navigation, route}) {
    const {id} = route.params

    // @ts-ignore
    const userId = useSelector((state) => state.auth?.user?.id);

    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const {loading, error, data, refetch} = useQuery(CHANNELS_BY_ID_QUERY, {
        variables: {id},
    });

    const categoryId = useMemo<string | null>(() => {
        return data?.channel?.categories?.[0]?.id || null
    }, [data])

    const channelId = useMemo<string | null>(() => {
        return data?.channel?.id || null
    }, [data])

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    useEffect(() => {
        const title = data?.channel?.title || ''
        navigation.setOptions({title: `Канал ${title}`});
    }, [navigation, data, loading]);


    if (loading) return <View><Text>Загрузка...</Text></View>;
    if (error) return <View><Text>Ошибка</Text></View>;

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View>
                <ChannelsCard
                    slot={
                        userId === data.channel.author.id && (
                            <>
                                {
                                    modalVisible ? (
                                        <TrackersCreateForm
                                            channelCategoryId={categoryId}
                                            channelId={channelId}
                                            onClose={() => {
                                                setModalVisible(false)
                                                refetch()
                                            }}
                                            visible={modalVisible}
                                        />
                                    ) : (
                                        <>
                                            <Text>{'\n'}</Text>
                                            <Button
                                                title={loading ? '...' : 'Создать трекер'}
                                                /* @ts-ignore */
                                                onPress={() => setModalVisible(true)}
                                            />
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                    {...data.channel}
                />
            </View>
        </ScrollView>
    );
}
