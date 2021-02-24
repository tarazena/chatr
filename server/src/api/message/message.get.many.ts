import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { Message } from "@prisma-generated";

export const getMessages = async (
  _obj: unknown,
  args: { id: string },
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<Message[] | null> => {
  return await ctx.db.message.findMany({
    where: {
      channelId: args.id,
    },
    include: {
      author: true
    }
  });
};
