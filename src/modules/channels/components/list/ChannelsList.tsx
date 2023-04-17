import {useMutation, useQuery} from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CHANNEL_DELETE_MUTATION } from '../../api/ChannelsDelete.api';
import { CHANNELS_LIST_SHORT_QUERY } from '../../api/ChannelsList.api';
import {useSelector} from "react-redux";


export const ChannelsList = () => {
    const { loading, error, data } = useQuery(CHANNELS_LIST_SHORT_QUERY);
    const [deleteChannelMutation] = useMutation(CHANNEL_DELETE_MUTATION);

    const navigation = useNavigation();

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


    const store = useSelector((state) => state);
    console.log(store)

    // @ts-ignore
    const userId = useSelector((state) => state.auth?.user?.id);

    const handleDeleteChannel = async (id) => {
        await deleteChannelMutation({ variables: { id } });
        // TODO: добавить alert, убрать удаление без подтверждения
        // Alert.alert(
        //     'Delete Channel',
        //     'Вы правда хотите удалить канал?',
        //     [
        //         {
        //             text: 'Отмена',
        //             style: 'cancel'
        //         },
        //         {
        //             text: 'Удалить',
        //             onPress: async () => {
        //                 await deleteChannelMutation({ variables: { id } });
        //             },
        //             style: 'destructive'
        //         }
        //     ]
        // );
    };

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', width: '100%' }}>
            <View
                style={{ flexGrow: 1 }}
            >
                <TouchableOpacity
                    onPress={() =>
                        // @ts-ignore
                        navigation.navigate('ChannelDetails', { id: item.id })
                    }
                >
                    <Text>{item.title}</Text>

                </TouchableOpacity>
            </View>


            {userId && userId === item.author.id && (
                <View
                    style={{ marginLeft: 8 }}
                >
                    <TouchableOpacity
                        onPress={() => handleDeleteChannel(item.id)}
                    >
                        <MaterialCommunityIcons
                            name="delete-outline"
                            size={24}
                            color="red"
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;

    return (
        <View>
            <FlatList
                data={computedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};
