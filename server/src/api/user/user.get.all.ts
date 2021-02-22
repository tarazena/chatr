import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { User } from "@prisma-generated";

export const getUserAll = async (
  _obj: unknown,
  _args: unknown,
  ctx: Context,
  _info: GraphQLResolveInfo
): Promise<User[] | null> => {
  return await ctx.db.user.findMany();
};
