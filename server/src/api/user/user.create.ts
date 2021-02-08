import { GraphQLResolveInfo } from "graphql";

import { Context } from "@interfaces";
import { User } from "@prisma-generated";

export const createUser = async (
  _obj: unknown,
  args: { name: string; email: string },
  context: Context,
  _info: GraphQLResolveInfo
): Promise<User> => {
  console.log("test");
  return await context.db.user.create({
    data: args,
  });
};
