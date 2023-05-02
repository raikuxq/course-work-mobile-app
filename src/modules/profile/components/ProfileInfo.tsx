import React, {useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { PROFILE_INFO_QUERY } from '../api/ProfileInfoQuery.api';
import {dateFormat} from "../../../../src/common/utils/dateFormat";

export function ProfileInfo() {

    const { loading, error, data } = useQuery(PROFILE_INFO_QUERY);

    if (loading) {
        return <Text>Загрузка...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <View>
            <Text>ID: {data.userCurrent.id}</Text>
            <Text>Email: {data.userCurrent.email}</Text>
            <Text>Имя: {data.userCurrent.firstname}</Text>
            <Text>Фамилия: {data.userCurrent.lastname}</Text>
            <Text>Дата регистрации: {dateFormat(data.userCurrent.createdAt)}</Text>
        </View>
    );
}
