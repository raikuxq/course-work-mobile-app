// import React from 'react';
// import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
//
// export const ChannelsCard = ({ author, members, categories, inviteLink }) => {
//
//     const navigation = useNavigation();
//
//     return (
//         <View>
//             <Text>
//                 Автор: {author.firstname} {author.lastname}
//             </Text>
//
//             <Text>
//                 Код для приглашения: {inviteLink}
//             </Text>
//
//
//             <Text>Участники:</Text>
//             <ScrollView>
//                 {members.map((member) => (
//                     <Text key={member.id}>
//                         {member.lastname}, {member.firstname} - {member.role}
//                     </Text>
//                 ))}
//             </ScrollView>
//
//
//             <Text>Список трекеров:</Text>
//             <ScrollView >
//                 {categories.map((category) =>
//                     category.trackers.map((tracker) => (
//                         <TouchableOpacity
//                             /* @ts-ignore */
//                             onPress={() => navigation.navigate('TrackerDetails', { id: tracker.id })}
//                             key={tracker.id}
//                         >
//                             <Text >
//                                 {tracker.title}
//                             </Text>
//                         </TouchableOpacity>
//                     ))
//                 )}
//             </ScrollView>
//         </View>
//     );
// };


import React from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {s} from "../../../../styles/config";
import {globalStyles} from "../../../../styles/globalStyles";

export const ChannelsCard = ({ author, members, categories, inviteLink, description }) => {

    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.details}>
                {
                    author ? (
                        <Text style={styles.detailsItem}>
                            <Text style={styles.detailsItemLabel}>Автор: </Text>{author.firstname || ''} {author.lastname || ''}
                        </Text>
                    ) : null
                }


                {
                    inviteLink ? (
                        <Text style={styles.detailsItem}>
                            <Text style={styles.detailsItemLabel}>Код для приглашения: </Text>{inviteLink || ''}
                        </Text>
                    ) : null
                }


                {
                    description ? (
                        <Text style={styles.detailsItem}>
                            <Text style={styles.detailsItemLabel}>Описание: </Text>{description || ''}
                        </Text>
                    ) : null
                }


                {
                    members?.length ? (
                        <>
                            <Text style={styles.detailsItem}>
                                <Text style={styles.detailsItemLabel}>Участники:</Text>
                            </Text>

                            <ScrollView>
                                {members.map((member) => (
                                    <Text key={member.id} style={styles.detailsItem}>
                                        {member.lastname} {member.firstname}
                                    </Text>
                                ))}
                            </ScrollView>
                        </>
                    ) : null
                }
            </View>

            <Text>Список трекеров:</Text>

            <ScrollView >
                {categories.map((category) =>
                    category.trackers.map((tracker) => (
                        <TouchableOpacity
                            /* @ts-ignore */
                            onPress={() => navigation.navigate('TrackerDetails', { id: tracker.id })}
                            key={tracker.id}
                        >
                            <Text>{tracker.title}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    details: globalStyles.details,
    detailsItem: globalStyles.detailsItem,
    detailsItemLabel: globalStyles.detailsItemLabel,
});

