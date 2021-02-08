import { Message } from "@prisma-generated";
import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";

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
  return await ctx.db.message.create({
    data: {
      text,
      userId,
      channelId,
    },
    include: {
      author: true
    }
  });
};
