import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ProfileInfo} from "../../profile/components/ProfileInfo";

export default function ProfileScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({ title: 'Профиль' });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ProfileInfo />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});
