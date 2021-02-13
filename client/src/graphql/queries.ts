import { gql } from "@apollo/client";

export const GET_ALL_CHANNELS = gql`
  query getAllChannels {
    getAllChannels {
      id
      name
      messages {
        text
        author {
          name
        }
      }
      users {
        name
      }
    }
  }
`;

export const GET_CHANNEL_MESSAGES = gql`
  query getMessages($id: String) {
    getMessages(id: $id) {
      text
    }
  }
`;