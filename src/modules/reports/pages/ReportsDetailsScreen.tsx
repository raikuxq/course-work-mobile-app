import React, {useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { ISSUE_REPORT_BY_ID_QUERY } from '../api/ReportsById.api';
import {s} from "../../../../src/styles/config";
import {dateFormat} from "../../../../src/common/utils/dateFormat";
import {
    labelsPriority,
    labelsStatus,
    labelsType
} from "../../../common/constants/options";

export default function ReportDetailsScreen ({ route, navigation }) {
    const { id } = route.params;
    const { loading, error, data } = useQuery(ISSUE_REPORT_BY_ID_QUERY, {
        variables: { id },
    });

    const issueReport = data?.issueReport || null

    useEffect(() => {
        const title = data?.issueReport?.title || ''
        navigation.setOptions({ title: `${title}` });
    }, [navigation, data]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;


    return (
        <View style={styles.container}>
            <Text style={styles.author}>
                {issueReport.author.user.lastname}, {issueReport.author.user.firstname} - {issueReport.author.role}
            </Text>
            <Text style={styles.description}>{issueReport.description}</Text>
            <View style={styles.details}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    author: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: 'Montserrat-500',
        color: s.black,
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
        fontFamily: 'Montserrat-500',
        color: s.black,
    },
    details: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontFamily: 'Montserrat-500',
        color: s.black,
    },
    detailsItem: {
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'Montserrat-500',
        color: s.black,
    },
    detailsItemLabel: {
        fontWeight: 'bold',
        fontFamily: 'Montserrat-500',
        color: s.black,
    },
});
