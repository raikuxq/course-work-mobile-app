import { gql } from 'graphql-tag';

export const TRACKER_CREATE_MUTATION = gql`
    mutation trackerCreate(
        $channelId: String!,
        $title: String!,
        $description: String,
        $channelCategoryId: String
    ) {
        trackerCreate(data: {
            channelId: $channelId,
            title: $title,
            description: $description,
            channelCategoryId: $channelCategoryId
        }) {
            id
            title
        }
    }
`;
