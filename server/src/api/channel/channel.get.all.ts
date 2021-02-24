import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { Channel } from "@prisma-generated";

export const getAllChannels = async (
  _obj: unknown,
  _args: unknown,
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<Channel[] | null> => {
  const id = ctx.request.headers.authorization;
  return await ctx.db.channel.findMany({
    where: {
      users: {
        some: {
          id
        }
      }
    },
    include: {
      messages: {
        include: {
          author: true,
        },
      },
      users: true,
    },
  });
};
