import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    dialog: Dialog!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Dialog {
    id: Int!
    users: [User]!
    messages: [Message]!
    unreadTotal: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
