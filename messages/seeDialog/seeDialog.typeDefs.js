import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeDialog(id: Int!): Dialog
  }
`;
