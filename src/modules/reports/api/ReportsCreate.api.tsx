import { gql } from 'graphql-tag';

export const REPORTS_CREATE_MUTATION = gql`
    mutation issueReportCreate(
        $trackerId: String!,
        $title: String!,
        $priority: IssueReportPriority!,
        $responsiblePersonId: String!,
        $description: String!,
        $type: IssueReportType!,
    ) {
        issueReportCreate(data: {
            trackerId: $trackerId,
            responsiblePersonId: $responsiblePersonId,
            priority: $priority,
            status: FULFILMENT,
            title: $title,
            type: $type,
            description: $description,
        }) {
            id
            title
        }
    }
`;
