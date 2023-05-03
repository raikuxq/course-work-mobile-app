import React, {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import AppNavigation from './src/common/components/navigation/AppNavigation';
import {Provider} from 'react-redux';
import store from './src/common/store/root'
import {client as apolloClient} from './src/common/config/apollo'
import {ApolloProvider} from "@apollo/client";
import * as Font from 'expo-font';
import {
    setCustomText,
    setCustomTouchableOpacity,
    setCustomTouchableHighlight,
    setCustomView,
    setCustomScrollView,
    setCustomTextInput
} from 'react-native-global-props';
import {globalStyles} from './src/styles/globalStyles';
import {ActivityIndicator} from "react-native";

const initStyles = () => {
    setCustomText({style: globalStyles.text});
    setCustomTouchableOpacity({style: globalStyles.touchableOpacity});
    setCustomTouchableHighlight({style: globalStyles.touchableHighlight});
    setCustomView({style: globalStyles.view});
    setCustomScrollView({style: globalStyles.scrollView});
    setCustomTextInput({style: globalStyles.textInput});
}

async function initFonts() {
    await Font.loadAsync({
        'Montserrat-300': require('./assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-400': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-500': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-600': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-700': require('./assets/fonts/Montserrat-Bold.ttf'),
    });
}

export default function App() {

    const [fontLoaded, setFontLoaded] = useState(false);


    /**
     * UI init
     */
    useEffect(() => {
        initStyles()
        initFonts().then(() => {
            setFontLoaded(true)
        });
    }, []);


    if (!fontLoaded) {
        return <ActivityIndicator />
    }

    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <StatusBar style="auto"/>
                    <AppNavigation/>
            </Provider>
        </ApolloProvider>

    );
}
