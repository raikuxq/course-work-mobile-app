    import React, {useEffect} from 'react';
    import { StatusBar } from 'expo-status-bar';
    import AppNavigation from './src/common/components/navigation/AppNavigation';
    import { Provider } from 'react-redux';
    import store from './src/common/store/root'
    import { client as apolloClient } from './src/common/config/apollo'
    import {ApolloProvider} from "@apollo/client";
    import * as Font from 'expo-font';
    import { setCustomText, setCustomTouchableOpacity, setCustomTouchableHighlight, setCustomView, setCustomTextInput } from 'react-native-global-props';
    import {globalStyles} from "./src/styles/globalStyles";


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
