import { Channel } from "@prisma-generated";
import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";

export const createChannel = async (
  _obj: unknown,
  args: { name?: string },
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<Channel> => {
  return await ctx.db.channel.create({ data: { name: args.name } });
};
