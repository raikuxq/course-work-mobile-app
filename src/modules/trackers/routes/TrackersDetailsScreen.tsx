import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from "@apollo/client";
import {TRACKERS_BY_ID_QUERY} from "../../trackers/api/TrackersById.api";
import ReportsCreateForm from "../../../modules/reports/components/ReportsCreateForm";
import {globalStyles} from "../../../styles/globalStyles";
import {dateFormat} from "../../../common/utils/dateFormat";

export default function TrackersDetailsScreen({ navigation, route }) {

    const { id } = route.params

    const [modalVisible, setModalVisible] = useState(false);

    const { loading, error, data } = useQuery(TRACKERS_BY_ID_QUERY, {
        variables: { id },
    });

    useEffect(() => {
        const title = data?.tracker?.title || ''
        navigation.setOptions({ title: `Трекер: ${title}` });
    }, [navigation, data]);

    if (loading) return <View><Text>Загрузка...</Text></View>;
    if (error) return <View><Text>Ошибка</Text></View>;

    return (
        <View>
            <View style={styles.details}>
                <Text style={styles.detailsItem}>
                    <Text style={styles.detailsItemLabel}>Название:</Text> {data.tracker?.title || ''}
                </Text>
                <Text style={styles.detailsItem}>
                    <Text style={styles.detailsItemLabel}>Описание:</Text> {data.tracker?.description || ''}
                </Text>
                <Text style={styles.detailsItem}>
                    <Text style={styles.detailsItemLabel}>Канал:</Text> {data.tracker?.channel?.title || ''}
                </Text>
                <Text style={styles.detailsItem}>
                    <Text style={styles.detailsItemLabel}>Дата создания:</Text> {dateFormat(data.tracker?.createdAt)}
                </Text>
            </View>

            <View>
                {data.tracker.members.map((member) => (
                    <Text key={member?.id}>
                        {member?.user?.lastname} {member.user?.firstname} ({member?.role})
                    </Text>
                ))}

                <View>
                    {
                        modalVisible ? (
                            <ReportsCreateForm
                                members={data.tracker.members}
                                trackerId={data.tracker.id}
                                onClose={() => setModalVisible(false)}
                                visible={modalVisible}
                            />
                        ) : (
                            <Button
                                title='Создать репорт'
                                /* @ts-ignore */
                                onPress={() => setModalVisible(true)}
                            />
                        )
                    }
                </View>
            </View>

            <View>
                {data.tracker.reports.map((report) => (
                    <TouchableOpacity
                        key={report.id}
                        onPress={() => navigation.navigate('IssueReportDetails', { id: report.id })}
                    >
                        <Text>
                            {report.title}, {report.author.user.firstname} - {report.author.role}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    details: globalStyles.details,
    detailsItem: globalStyles.detailsItem,
    detailsItemLabel: globalStyles.detailsItemLabel,
});
