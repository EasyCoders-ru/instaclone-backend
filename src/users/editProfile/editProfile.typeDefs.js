import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      bio: String
      password: String
      avatar: Upload
    ): MutationResponse!
  }
`;
