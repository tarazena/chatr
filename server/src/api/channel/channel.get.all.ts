import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { Channel } from "@prisma-generated";

export const getAllChannels = async (
  _obj: unknown,
  _args: unknown,
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<Channel[] | null> => {
  return await ctx.db.channel.findMany({
    include: {
      messages: {
        include: {
          author: true
        }
      },
      users: true,
    },
  });
};
