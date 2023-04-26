import React, {useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { PROFILE_INFO_QUERY } from '../api/ProfileInfoQuery.api';
import {dateFormat} from "../../../../src/common/utils/dateFormat";

export function ProfileInfo() {

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
            <Text style={styles.text}>Дата регистрации: {dateFormat(data.userCurrent.createdAt)}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    text: {
        textAlign: 'left',
        fontFamily: 'Montserrat-500',
        marginBottom: 10,
    }
});
