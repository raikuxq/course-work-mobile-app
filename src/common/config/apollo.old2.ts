// import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
// import { onError } from '@apollo/client/link/error';
// import { TokenRefreshLink } from 'apollo-link-token-refresh';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// import jwtDecode from 'jwt-decode';
// import { GRAPHQL_API_ENDPOINT_URL } from '../constants/constants';
//
// interface DecodedToken {
//     exp: number;
// }
//
// const refreshTokenLink = new TokenRefreshLink({
//     isTokenValidOrUndefined: () => {
//         const token = AsyncStorage.getItem('accessToken');
//
//         if (!token) {
//             return true;
//         }
//
//         try {
//             const decodedToken: DecodedToken = jwtDecode(token);
//             const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
//             return !isTokenExpired;
//         } catch (e) {
//             console.log(e);
//             return false;
//         }
//     },
//     fetchAccessToken: () => AsyncStorage.getItem('accessToken'),
//     handleFetch: (accessToken) =>
//         fetch(GRAPHQL_API_ENDPOINT_URL, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//                 authorization: `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify({
//                 query: `
//           mutation authRefreshToken($token: JWT!) {
//             authRefreshToken(token: $token) {
//               accessToken
//               refreshToken
//             }
//           }
//         `,
//                 variables: {
//                     token: accessToken,
//                 },
//             }),
//         }).then((response) => response.json()),
//     handleError: (err) => console.warn('Error fetching refresh token:', err),
//     handleResponse: (operation, accessTokenField) => (response) => {
//         const { accessToken, refreshToken } = response.data.authRefreshToken;
//         AsyncStorage.setItem('accessToken', accessToken);
//         AsyncStorage.setItem('refreshToken', refreshToken);
//     },
// });
//
// const httpLink = createHttpLink({
//     uri: GRAPHQL_API_ENDPOINT_URL,
// });
//
// const errorLink = onError(({ networkError, operation, forward }) => {
//     // @ts-ignore
//     if (networkError && networkError.statusCode === 401 && !operation.getContext().retry) {
//         operation.setContext({
//             retry: true,
//         });
//         return refreshTokenLink.request(operation, forward);
//     }
// });
//
// const authLink = new ApolloLink(async (operation, forward) => {
//     const token = await AsyncStorage.getItem('accessToken');
//
//     operation.setContext({
//         headers: {
//             authorization: token ? `Bearer ${token}` : '',
//         },
//     });
//
//     return forward(operation);
// });
//
// const link = ApolloLink.from([errorLink, refreshTokenLink, authLink, httpLink]);
//
// const client = new ApolloClient({
//     link,
//     cache: new InMemoryCache(),
//     connectToDevTools: true, // включает режим разработчика
//     defaultOptions: {
//         watchQuery: {
//             fetchPolicy: 'network-only',
//         },
//         query: {
//             fetchPolicy: 'network-only',
//         },
//         mutate: {
//             fetchPolicy: 'network-only',
//         },
//     }
// });
//
// export { client };
