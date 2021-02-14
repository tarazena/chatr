import { pubSub } from "../../util/pgPubSub";

export const messageAdded = {
  subscribe: () => {
    return pubSub.asyncIterator("MESSAGE CREATED");
  },
};
