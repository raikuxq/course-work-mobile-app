import { gql } from 'graphql-tag'

export const CHANNEL_CREATE_MUTATION = gql`
    mutation channelCreate($title: String!, $description: String!) {
        channelCreate(data: {
            title: $title,
            description: $description
        }) {
            id
            createdAt
            updatedAt
            title
            description
            author {
                id
                firstname
            }
        }
    }
`;
