import { gql } from 'graphql-tag'

export const AUTH_SIGNUP_MUTATION = gql`
    mutation authSignup(
        $email: String!
        $password: String!
        $firstname: String
        $lastname: String
    ) {
        authSignup(
            data: {
                email: $email
                password: $password
                firstname: $firstname
                lastname: $lastname
            }
        ) {
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
