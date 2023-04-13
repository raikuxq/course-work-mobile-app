import React from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const ChannelsCard = ({ author, members, categories, inviteLink }) => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>
                Автор: {author.firstname} {author.lastname}
            </Text>

            <Text>
                Код для приглашения: {inviteLink}
            </Text>


            <Text>Участники:</Text>
            <ScrollView>
                {members.map((member) => (
                    <Text key={member.id}>
                        {member.lastname}, {member.firstname} - {member.role}
                    </Text>
                ))}
            </ScrollView>


            <Text>Список трекеров:</Text>
            <ScrollView >
                {categories.map((category) =>
                    category.trackers.map((tracker) => (
                        <TouchableOpacity
                            /* @ts-ignore */
                            onPress={() => navigation.navigate('TrackerDetails', { id: tracker.id })}
                            key={tracker.id}
                        >
                            <Text >
                                {tracker.title}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};
