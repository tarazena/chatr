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
`