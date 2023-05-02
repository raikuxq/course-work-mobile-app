import {StyleSheet} from "react-native";
import {s} from "./config";

export const globalStyles = StyleSheet.create({
    // Общие стили для компонентов
    scrollView: {
        flex: 1,
    },
    switch: {
        alignSelf: 'center',
        fontFamily: 'Montserrat-500',
    },
    textInput: {
        borderWidth: 1,
        borderColor: s.gray,
        borderRadius: 2,
        padding: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-500',
        fontSize: 14,
        color: s.black,
        placeholderTextColor: s.gray,
    },
    touchableHighlight: {
        backgroundColor: s.blue,
        padding: 10,
        borderRadius: 2,
        fontFamily: 'Montserrat-500',
        color: s.white,
        textAlign: 'center'
    },
    touchableOpacity: {
        backgroundColor: s.lightGrey,
        color: s.black,
        padding: 10,
        marginBottom: 10,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: s.gray,
        fontFamily: 'Montserrat-500',
    },
    view: {
        flex: 1,
        backgroundColor: s.white,
        color: s.black,
        padding: 10,
        fontFamily: 'Montserrat-500',
        borderRadius: 2,
    },
    text: {
        fontFamily: 'Montserrat-500',
        color: s.black,
        fontSize: 14,
        lineHeight: 24,
        letterSpacing: 0,
    },



    /**
     * Custom
     */
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
        lineHeight: 24,
        color: s.black,
    },
    detailsItemLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-600',
        lineHeight: 24,
        color: s.black,
    },
});
