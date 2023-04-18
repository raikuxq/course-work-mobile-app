import { gql } from 'graphql-tag';

export const REPORTS_CREATE_MUTATION = gql`
    mutation issueReportCreate(
        $trackerId: String!,
        $title: String!,
        $priority: IssueReportPriority!,
        $responsiblePersonId: String!,
        $description: String!,
        $status: IssueReportStatus!,
        $type: IssueReportType!,
    ) {
        issueReportCreate(data: {
            trackerId: $trackerId,
            responsiblePersonId: $responsiblePersonId,
            priority: $priority,
            status: $status,
            title: $title,
            type: $type,
            description: $description,
        }) {
            id
        }
    }
`;
