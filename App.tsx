import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigation from './src/common/components/navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/common/store/root'
import { client as apolloClient } from './src/common/config/apollo'
import {ApolloProvider} from "@apollo/client";

export default function App() {
  return (
      <ApolloProvider client={apolloClient}>
          <Provider store={store}>
              <StatusBar style="auto" />
              <AppNavigation />
          </Provider>
      </ApolloProvider>

  );
}
