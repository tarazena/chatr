import { gql } from "@apollo/client";

export const MESSAGE_ADDED = gql`
  subscription {
    messageAdded(channelId: "") {
      id
    }
  }
`;

export const CHANNEL_CREATED = gql`
  subscription channelCreated($userId: ID!) {
    channelCreated(userId: $userId) {
      id
    }
  }
`;
