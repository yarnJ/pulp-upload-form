import { gql } from "apollo-server-micro";

export const userSchema = gql`
  type User {
    id: String!
    name: String!
    biography: String!
    imageUrl: String!
  }

  input CreateUserInput {
    name: String!
    biography: String!
    imageUrl: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: String!): User
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    createSignedUploadUrl: String!
  }
`;
