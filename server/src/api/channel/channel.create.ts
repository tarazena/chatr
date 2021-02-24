import { Channel } from "@prisma-generated";
import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { pubSub } from "../../util/pgPubSub";

export const createChannel = async (
  _obj: unknown,
  args: { name?: string; users: string[] },
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<Channel> => {
  const channel = await ctx.db.channel.create({
    data: {
      name: args.name,
      users: {
        connect: args.users.map((id) => ({ id })),
      },
    },
    include: {
      users: true
    }
  });
  pubSub.publish("CHANNEL CREATED", { channelCreated: channel });
  return channel;
};
