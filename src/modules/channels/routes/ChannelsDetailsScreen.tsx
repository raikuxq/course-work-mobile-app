import React, {useEffect, useMemo, useState} from 'react';
import {Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {ChannelsCard} from "../components/card/ChannelsCard";
import {useQuery} from "@apollo/client";
import {CHANNELS_BY_ID_QUERY} from "../api/ChannelsById.api";
import {TrackersCreateForm} from "../../trackers/components/TrackersCreateForm";
import {useSelector} from "react-redux";
import {globalStyles} from "../../../styles/globalStyles";
import {s} from "../../../styles/config";


export default function ChannelsDetailsScreen({navigation, route}) {
    const {id} = route.params

    // @ts-ignore
    const userId = useSelector((state) => state.auth?.user?.id);

    const [modalVisible, setModalVisible] = useState(false);

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


    if (loading) return <View><Text>Загрузка...</Text></View>;
    if (error) return <View><Text>Ошибка</Text></View>;

    return (
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
                                        onClose={() => setModalVisible(false)}
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
    );
}
