import { gql } from 'graphql-tag'

export const ISSUE_REPORT_BY_ID_QUERY = gql`
    query issueReport($id: String!) {
        issueReport(id: $id) {
            id
            title
            type
            status
            priority
            responsiblePerson {
                id
                role
                user {
                    id
                    firstname
                    lastname
                }
            }
            author {
                role
                id
                user {
                    id
                    firstname
                    lastname
                }
            }
            tracker {
                id
                title
                members {
                    id
                    user {
                        id
                        firstname
                        lastname
                    }
                }
            }
            description
            createdAt
        }
    }
`;
