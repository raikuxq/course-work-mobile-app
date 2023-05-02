import { gql } from 'graphql-tag';

export const TRACKER_ADD_MEMBER_MUTATION = gql`
    mutation trackerAddMember(
        $trackerId: String!,
        $role: TrackerMemberRole!,
        $userId: String!
    ) {
        trackerAddMember(data: {
            role: $role,
            trackerId: $trackerId,
            userId: $userId
        }) {
            id
        }
    }
`;
