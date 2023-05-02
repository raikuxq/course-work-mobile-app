import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ProfileInfo} from "../../profile/components/ProfileInfo";

export default function ProfileScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({ title: 'Профиль' });
    }, [navigation]);

    return (
        <View>
            <ProfileInfo />
        </View>
    );
}
