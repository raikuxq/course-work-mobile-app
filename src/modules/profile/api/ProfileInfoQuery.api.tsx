import { gql } from 'graphql-tag'

export const PROFILE_INFO_QUERY = gql`
    query currentUser {
        userCurrent {
            id
            email
            firstname
            lastname
            role
            createdAt
            updatedAt
        }
    }
`;
