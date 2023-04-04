import { gql } from 'graphql-tag'

export const CHANNELS_LIST_SHORT_QUERY = gql`
    query userChannels {
        userChannels {
            id
            title
        }
    }
`;
