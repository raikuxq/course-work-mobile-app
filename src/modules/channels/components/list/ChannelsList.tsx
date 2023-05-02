import {useMutation} from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CHANNEL_DELETE_MUTATION } from '../../api/ChannelsDelete.api';
import {useSelector} from "react-redux";


export const ChannelsList = ({ computedData, onDelete }) => {
    const [deleteChannelMutation] = useMutation(CHANNEL_DELETE_MUTATION);
    const navigation = useNavigation();
    const store = useSelector((state) => state);

    // @ts-ignore
    const userId = useSelector((state) => state.auth?.user?.id);

    const handleDeleteChannel = async (id) => {
        if (alert) {
            await deleteChannelMutation({ variables: { id } });
            onDelete?.()
        }
        Alert.alert(
            'Удалить канал',
            'Вы правда хотите удалить канал?',
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    onPress: async () => {
                        await deleteChannelMutation({ variables: { id } });
                        onDelete?.()
                    },
                    style: 'destructive'
                }
            ]
        );
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
