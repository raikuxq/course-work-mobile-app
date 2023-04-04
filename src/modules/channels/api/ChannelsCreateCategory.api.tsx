import { gql } from 'graphql-tag'

export const CHANNEL_CREATE_CATEGORY_MUTATION = gql`
    mutation channelCategoryCreate($title: String!, $channelId: String!) {
        channelCategoryCreate(data: {title: $title, channelId: $channelId}) {
            id
            createdAt
            updatedAt
            title
        }
    }
`;
