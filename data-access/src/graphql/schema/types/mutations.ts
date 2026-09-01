import { gql } from 'graphql-tag';

export const mutations = gql`

    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            firstName
            lastName
            profileImg
            username
            createdAt
            updatedAt
        }
    }

    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
            id
            firstName
            lastName
            profileImg
            username
            createdAt
            updatedAt
        }
    }

    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`;
