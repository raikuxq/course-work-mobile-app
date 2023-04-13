import { gql } from 'graphql-tag'

export const CHANNELS_LIST_SHORT_QUERY = gql`
    query userChannels {
        userChannelsOwn {
            id
            title
        }
        userChannelsMemberOf {
            id
            channel {
                id
                title
            }
        }
    }
`;
