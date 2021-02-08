import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { User } from "@prisma-generated";

export const getUser = async (
  _obj: unknown,
  args: { id: string },
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<User | null> => {
  return await ctx.db.user.findUnique({
    where: {
      id: args.id,
    },
  });
};
