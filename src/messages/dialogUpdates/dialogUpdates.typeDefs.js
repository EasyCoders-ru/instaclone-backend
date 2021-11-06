import { gql } from "apollo-server-express";

export default gql`
  type Subscription {
    dialogUpdates(id: Int!): Message
  }
`;
