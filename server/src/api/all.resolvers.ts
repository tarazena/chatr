import { createChannel, getChannel, getAllChannels } from "./channel";
import { createUser, getUser, getUserAll } from "./user";
import { createMessage, getMessages, messageAdded } from "./message";

export default {
  Query: {
    getUser,
    getMessages,
    getChannel,
    getAllChannels,
    getUserAll
  },
  Mutation: {
    createUser,
    createMessage,
    createChannel,
  },
  Subscription: {
    messageAdded,
  },
};
