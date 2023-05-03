import { gql } from 'graphql-tag'

export const TRACKERS_BY_ID_QUERY = gql`
    query tracker($id: String!) {
        tracker(id: $id) {
            id
            title
            members {
                id
                role
                user {
                    id
                    firstname
                    lastname
                }
            }
            description
            createdAt
            channel {
                title
                members {
                    id
                    lastname
                    firstname
                    role
                }
            }
            reports {
                id
                title
                createdAt
                author {
                    id
                    user {
                        firstname
                        lastname
                    }
                    role
                }
            }
        }
    }
`;
