import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    dialog: Dialog!
    createdAt: String!
    updatedAt: String!
  }

  type Dialog {
    id: Int!
    users: [User]!
    messages: [Message]!
    createdAt: String!
    updatedAt: String!
  }
`;
