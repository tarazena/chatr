import { Channel, User } from "@prisma-generated";
import { withFilter } from "apollo-server-express";
import { pubSub } from "../../util/pgPubSub";

export const channelCreated = {
  subscribe: withFilter(
    () => pubSub.asyncIterator("CHANNEL CREATED"),
    (
      variables: {
        channelCreated: Channel & {
          users: User[];
        };
      },
      payload
    ) => {

      console.log(
        "P",
        payload,
        "V",
        variables.channelCreated
      );
      return !!variables.channelCreated.users.find(
        (x) => x.id === payload.userId
      );
    }
  ),
};
