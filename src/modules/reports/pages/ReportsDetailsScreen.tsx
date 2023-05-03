import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, RefreshControl, Button} from 'react-native';
import { useQuery } from '@apollo/client';
import { ISSUE_REPORT_BY_ID_QUERY } from '../api/ReportsById.api';
import {dateFormat} from "../../../../src/common/utils/dateFormat";
import {
    labelsPriority,
    labelsStatus,
    labelsType
} from "../../../common/constants/options";
import {globalStyles} from "../../../styles/globalStyles";
import ReportsUpdateForm from "../../../modules/reports/components/ReportsUpdateForm";

export default function ReportDetailsScreen ({ route, navigation }) {
    const { id } = route.params;
    const [modalReportVisible, setModalReportVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { loading, error, data, refetch } = useQuery(ISSUE_REPORT_BY_ID_QUERY, {
        variables: { id },
    });

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const issueReport = data?.issueReport || null

    useEffect(() => {
        const title = data?.issueReport?.title || ''
        navigation.setOptions({ title: `${title}` });
    }, [navigation, data]);

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
                <View style={styles.details}>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Автор: </Text>
                        {issueReport.author.user.lastname} {issueReport.author.user.firstname} ({issueReport.author.role})
                    </Text>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Ответственный: </Text>
                        {issueReport.responsiblePerson.user.lastname} {issueReport.responsiblePerson.user.firstname} ({issueReport.responsiblePerson.role})
                    </Text>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Тип:</Text> {labelsType[issueReport.type]}
                    </Text>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Статус:</Text> {labelsStatus[issueReport.status]}
                    </Text>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Приоритет:</Text> {labelsPriority[issueReport.priority]}
                    </Text>
                    <Text style={styles.detailsItem}>
                        <Text style={styles.detailsItemLabel}>Дата создания:</Text> {dateFormat(issueReport.createdAt)}
                    </Text>
                </View>

                <Text>{'\n'}{issueReport.description}{'\n'}</Text>

                {
                    modalReportVisible ? (
                        <ReportsUpdateForm
                            initialValues={{
                                title: issueReport.title,
                                responsiblePersonId: issueReport.responsiblePerson.id,
                                type:  issueReport.type,
                                status: issueReport.status,
                                description: issueReport.description,
                                priority: issueReport.priority
                            }}
                            issueReportId={issueReport.id}
                            members={issueReport.tracker.members}
                            onClose={() => {
                                setModalReportVisible(false)
                                refetch()
                            }}
                            visible={modalReportVisible}
                        />
                    ) : (
                        <Button
                            title='Обновить баг-репорт'
                            /* @ts-ignore */
                            onPress={() => setModalReportVisible(true)}
                        />
                    )
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    details: globalStyles.details,
    detailsItem: globalStyles.detailsItem,
    detailsItemLabel: globalStyles.detailsItemLabel,
});
