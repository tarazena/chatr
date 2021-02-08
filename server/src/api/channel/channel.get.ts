import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { Channel } from "@prisma-generated";

export const getChannel = async (
  _obj: unknown,
  args: { id: string },
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<Channel | null> => {
  return await ctx.db.channel.findUnique({
    where: {
      id: args.id,
    },
    include: {
      messages: true,
      users: true
    }
  });
};
