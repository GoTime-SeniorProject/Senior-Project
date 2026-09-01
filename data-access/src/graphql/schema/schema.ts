import { gql } from 'graphql-tag';

export const schema = gql`
  scalar Date
  scalar Time
  scalar DateTime
  scalar JSON

  type User {
    _id: ID!
    id: ID!
    firstName: String
    lastName: String
    username: String!
    password: String
    profileImg: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    username: String!
    password: String!
    profileImg: String
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    profileImg: String
    username: String
    password: String
  }

  type Query {
    getUser(id: ID!): User
    getUserByUsername(username: String!): User
    getUsers(limit: Int = 25, offset: Int = 0, username: String): [User!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }
`;
