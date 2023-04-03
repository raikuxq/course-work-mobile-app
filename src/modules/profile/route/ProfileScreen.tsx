import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ProfileInfo} from "../../profile/components/ProfileInfo";

export default function ProfileScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({ title: 'Профиль' });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>This is the Profile Screen</Text>
            <ProfileInfo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
