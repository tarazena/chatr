import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation createMessage($channelId: String, $text: String, $userId: String) {
    createMessage(channelId: $channelId, text: $text, userId: $userId) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String, $email: String) {
    createUser(name: $name, email: $email) {
      id
    }
  }
`;