import { gql } from 'graphql-tag'

export const CHANNEL_JOIN_TO_MUTATION = gql`
    mutation channelJoin($inviteLink: String!) {
        channelJoin(data: {inviteLink: $inviteLink}) {
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
