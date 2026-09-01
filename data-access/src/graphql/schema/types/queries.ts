import { gql } from 'graphql-tag';

export const queries = gql`

    query GetUsers($limit: Int = 25, $offset: Int = 0, $username: String) {
        getUsers(limit: $limit, offset: $offset, username: $username) {
            id
            firstName
            lastName
            username
            profileImg
            password
            createdAt
            updatedAt
        }
    }

    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            username
            profileImg
            password
            createdAt
            updatedAt
        }
    }

    query GetUserByUsername($username: String!) {
        getUsers(limit: 1, offset: 0, username: $username) {
            id
            firstName
            lastName
            username
            profileImg
            password
        }
    }
`;
