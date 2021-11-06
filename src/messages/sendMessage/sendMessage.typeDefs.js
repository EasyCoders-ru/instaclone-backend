import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    sendMessage(payload: String!, dialogId: Int, userId: Int): MutationResponse!
  }
`;
