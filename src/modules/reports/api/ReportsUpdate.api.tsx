import { gql } from 'graphql-tag';

export const REPORTS_UPDATE_MUTATION = gql`
    mutation issueReportUpdate(
        $issueReportId: String!,
        $title: String!,
        $priority: IssueReportPriority!,
        $responsiblePersonId: String!,
        $description: String!,
        $status: IssueReportStatus!,
        $type: IssueReportType!,
    ) {
        issueReportUpdate(id: $issueReportId, data: {
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
