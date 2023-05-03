import React, {useEffect, useState} from 'react';
import {Button, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from "@apollo/client";
import {TRACKERS_BY_ID_QUERY} from "../../trackers/api/TrackersById.api";
import ReportsCreateForm from "../../../modules/reports/components/ReportsCreateForm";
import {globalStyles} from "../../../styles/globalStyles";
import {dateFormat} from "../../../common/utils/dateFormat";
import TrackersAddMemberForm from "../../../modules/trackers/components/TrackersAddMemberForm";
import {labelsRole} from "../../../common/constants/options";

export default function TrackersDetailsScreen({navigation, route}) {

    const {id} = route.params

    const [modalReportVisible, setModalReportVisible] = useState(false);
    const [modalMemberVisible, setModalMemberVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const {loading, error, data, refetch} = useQuery(TRACKERS_BY_ID_QUERY, {
        variables: {id},
    });

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    useEffect(() => {
        const title = data?.tracker?.title || ''
        navigation.setOptions({title: `Трекер: ${title}`});
    }, [navigation, data]);

    if (loading) return <View><Text>Загрузка...</Text></View>;
    if (error || !data) return <View><Text>Ошибка</Text></View>;

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
                        <Text style={styles.detailsItemLabel}>Дата
                            создания:</Text> {dateFormat(data.tracker?.createdAt)}
                    </Text>
                </View>

                <View style={{...styles.details, marginTop: 10}}>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Список участников:</Text>
                    </Text>

                    {data.tracker.members
                        .filter((obj, index, self) => index === self.findIndex((t) =>
                            (t.user?.firstname === obj.user?.firstname) &&
                            (t.user?.lastname === obj.user?.lastname) &&
                            (t.role === obj.role)
                        ))
                        .map((member) => (
                            <Text key={member?.id}>
                                {member?.user?.lastname} {member.user?.firstname} ({labelsRole[member?.role]})
                            </Text>
                        ))
                    }

                    <Text style={{marginBottom: 5}}/>

                    {
                        modalMemberVisible ? (
                            <TrackersAddMemberForm
                                members={[data.tracker.channel.author, ...data.tracker.channel.members]}
                                trackerId={data.tracker.id}
                                onClose={() => setModalMemberVisible(false)}
                                visible={modalMemberVisible}
                            />
                        ) : (
                            <Button
                                title='Добавить участника'
                                /* @ts-ignore */
                                onPress={() => setModalMemberVisible(true)}
                            />
                        )
                    }
                </View>

                <View style={{...styles.details, marginTop: 10}}>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Список баг-репортов:</Text>
                    </Text>

                    {
                        modalReportVisible ? (
                            <ReportsCreateForm
                                members={data.tracker.members}
                                trackerId={data.tracker.id}
                                onClose={() => {
                                    setModalReportVisible(false)
                                    refetch()
                                }}
                                visible={modalReportVisible}
                            />
                        ) : (
                            <Button
                                title='Создать репорт'
                                /* @ts-ignore */
                                onPress={() => setModalReportVisible(true)}
                            />
                        )
                    }

                    <Text style={{marginBottom: 5}}/>

                    <View style={{...globalStyles.view, paddingHorizontal: 0}}>
                        {data.tracker.reports.map((report) => (
                            <TouchableOpacity
                                key={report.id}
                                onPress={() => navigation.navigate('IssueReportDetails', {id: report.id})}
                            >
                                <Text>
                                    {report.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    details: globalStyles.details,
    detailsItem: globalStyles.detailsItem,
    detailsItemLabel: globalStyles.detailsItemLabel,
});
