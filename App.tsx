    import React, {useEffect} from 'react';
    import { StatusBar } from 'expo-status-bar';
    import AppNavigation from './src/common/components/navigation/AppNavigation';
    import { Provider } from 'react-redux';
    import store from './src/common/store/root'
    import { client as apolloClient } from './src/common/config/apollo'
    import {ApolloProvider} from "@apollo/client";
    import * as Font from 'expo-font';
    import { StyleSheet } from 'react-native';
    import { setCustomText, setCustomTouchableOpacity, setCustomTouchableHighlight, setCustomView, setCustomTextInput } from 'react-native-global-props';

    export const s = {
        // Цвета
        purple: '#6200ee',
        blue: '#2196f3',
        darkBlue: '#007aff',
        gray: '#8e8e8f',
        black: '#111111',
        white: '#ffffff',

        // Шрифты
        regularFont: 'Montserrat-500',
        boldFont: 'Montserrat-700',

        // Размер текста
        defaultFontSize: 14,
        headerFontSize: 18,
    }

    const globalStyles = StyleSheet.create({
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
        },
        touchableOpacity: {
            backgroundColor: s.purple,
            color: s.white,
            padding: 10,
            borderRadius: 2,
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
            lineHeight: 20,
            letterSpacing: 0.25,
        },
    });


    const initStyles = () => {
        setCustomText({ style: globalStyles.text });
        setCustomTouchableOpacity({ style: globalStyles.touchableOpacity });
        setCustomTouchableHighlight({ style: globalStyles.touchableHighlight });
        setCustomView({ style: globalStyles.view });
        setCustomTextInput({ style: globalStyles.textInput });
    }

    export default function App() {

        async function loadFonts() {
            await Font.loadAsync({
                'Montserrat-300': require('./assets/fonts/Montserrat-Light.ttf'),
                'Montserrat-400': require('./assets/fonts/Montserrat-Regular.ttf'),
                'Montserrat-500': require('./assets/fonts/Montserrat-Medium.ttf'),
                'Montserrat-600': require('./assets/fonts/Montserrat-SemiBold.ttf'),
                'Montserrat-700': require('./assets/fonts/Montserrat-Bold.ttf'),
            });
        }

        useEffect(() => {
            initStyles()
            loadFonts();
        }, []);

      return (
          <ApolloProvider client={apolloClient}>
              <Provider store={store}>
                  <StatusBar style="auto" />
                  <AppNavigation />
              </Provider>
          </ApolloProvider>

      );
    }
