import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { AppNetInfo } from '../../../../src/common/components/net/AppNetInfo';
import { PROFILE_INFO_QUERY } from '../api/ProfileInfoQuery.api';

export function ProfileInfo() {

    // return (
    //     <Text style={styles.text}>Профиль тут</Text>
    // )
    const { loading, error, data } = useQuery(PROFILE_INFO_QUERY);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>ID: {data.userCurrent.id}</Text>
            <Text style={styles.text}>Email: {data.userCurrent.email}</Text>
            <Text style={styles.text}>Имя: {data.userCurrent.firstname}</Text>
            <Text style={styles.text}>Фамилия: {data.userCurrent.lastname}</Text>
            <Text style={styles.text}>Роль: {data.userCurrent.role}</Text>
            <Text style={styles.text}>Дата создания: {data.userCurrent.createdAt}</Text>
            <Text style={styles.text}>Дата обновления: {data.userCurrent.updatedAt}</Text>
            <AppNetInfo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginBottom: 10,
    },
});
