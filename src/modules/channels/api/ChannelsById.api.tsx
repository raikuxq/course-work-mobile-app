import { gql } from 'graphql-tag'

export const CHANNELS_BY_ID_QUERY = gql`
    query channel($id: String!) {
        channel(id: $id) {
            id
            title
            description
            inviteLink
            author {
                id
                firstname
                lastname
            }
            members {
                id
                lastname
                firstname
                role
            }
            categories {
                title
                id
                trackers {
                    id
                    title
                }
            }
        }
    }
`;
