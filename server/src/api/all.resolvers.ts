import { createChannel, getChannel, getAllChannels } from "./channel";
import { createUser, getUser } from "./user";
import { createMessage, getMessages, messageAdded } from "./message";

export default {
  Query: {
    getUser,
    getMessages,
    getChannel,
    getAllChannels,
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
