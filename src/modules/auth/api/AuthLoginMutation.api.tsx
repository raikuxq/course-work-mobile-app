import { gql } from 'graphql-tag'

export const AUTH_LOGIN_MUTATION = gql`
    mutation authLogin($email: String!, $password: String!) {
        authLogin(data: { email: $email, password: $password }) {
            accessToken
            refreshToken
            user {
                id
                email
                firstname
                lastname
                role
            }
        }
    }
`;
