import { gql } from 'graphql-tag'

export const CHANNEL_DELETE_MUTATION = gql`
    mutation channelDelete($id: String!) {
        channelDelete(id: $id)
    }
`;
