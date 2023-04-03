import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {AppNetInfo} from "../../../../src/common/components/net/AppNetInfo";

export default function MainScreen({ navigation }) {

    useEffect(() => {
        navigation.setOptions({ title: 'Главная' });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>This is the Profile Screen</Text>
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
});
