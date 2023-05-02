import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
    Operation
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { GRAPHQL_API_ENDPOINT_URL } from '../constants/constants';
import {setContext} from "@apollo/client/link/context";

interface DecodedToken {
    exp: number;
}

const refreshToken = async (): Promise<string | null> => {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token) {
        return null;
    }

    try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
        if (!isTokenExpired) {
            return token;
        }
    } catch (e) {

    }




    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
        return null;
    }

    try {
        const decodedToken: DecodedToken = jwtDecode(refreshToken);
        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
        if (!isTokenExpired) {
            return refreshToken;
        }
    } catch (e) {

    }

    const response = await fetch(GRAPHQL_API_ENDPOINT_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            query: `
        mutation authRefreshToken($token: JWT!) {
          authRefreshToken(token: $token) {
            accessToken
            refreshToken
          }
        }
      `,
            variables: {
                token: refreshToken,
            },
        }),
    });

    const json = await response.json();
    const newAccessToken = json.data.authRefreshToken.accessToken;
    await AsyncStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
};

const authLink = setContext(async (operation: Operation, { headers }) => {
    const token = await refreshToken();

    return ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    });
});


const httpLink = createHttpLink({
    uri: GRAPHQL_API_ENDPOINT_URL,
});

const link = ApolloLink.from([authLink, httpLink]);


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
        mutate: {
            fetchPolicy: 'network-only',
        },
    }
});

export { client };
