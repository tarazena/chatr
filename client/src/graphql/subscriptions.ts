import { gql } from "@apollo/client";

export const MESSAGE_ADDED = gql`
  subscription {
    messageAdded(channelId: "") {
      id
    }
  }
`;
