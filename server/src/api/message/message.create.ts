import { Message } from "@prisma-generated";
import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { pubSub } from "../../util/pgPubSub";

export const createMessage = async (
  _obj: unknown,
  {
    channelId,
    text,
    userId,
  }: { userId: string; text: string; channelId: string },
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<Message> => {
  pubSub.publish("MESSAGE CREATED", { messageAdded: { id: channelId } });
  return await ctx.db.message.create({
    data: {
      text,
      Channel: {
        connect: {
          id: channelId,
        },
      },
      author: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      author: true,
    },
  });
};
