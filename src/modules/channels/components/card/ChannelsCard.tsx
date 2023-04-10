import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const ChannelsCard = ({ author, members, categories }) => {

    const navigation = useNavigation();

    return (
        <View style={{ margin: 16 }}>
            <Text style={{ marginBottom: 8 }}>
                Author: {author.firstname} {author.lastname}
            </Text>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                    Members:
                </Text>
                {members.map((member) => (
                    <Text key={member.id}>
                        {member.lastname}, {member.firstname} - {member.role}
                    </Text>
                ))}
            </View>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                    Categories:
                </Text>
                {categories.map((category) => (
                    <Text key={category.id}>{category.title}</Text>
                ))}
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                    Trackers:
                </Text>
                {categories.map((category) =>
                    category.trackers.map((tracker) => (
                        <TouchableOpacity
                            /* @ts-ignore */
                            onPress={() => navigation.navigate('TrackerDetails', { id: tracker.id })}
                            key={tracker.id}
                        >
                            <Text >
                                {tracker.id} - {tracker.title}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </View>
    );
};
