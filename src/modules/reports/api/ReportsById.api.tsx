import { gql } from 'graphql-tag'

export const ISSUE_REPORT_BY_ID_QUERY = gql`
    query issueReport($id: String!) {
        issueReport(id: $id) {
            id
            title
            type
            status
            priority
            author {
                role
                id
                user {
                    firstname
                    lastname
                }
            }
            description
            createdAt
            
        }
    }
`;
