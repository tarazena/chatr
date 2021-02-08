import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolversArray = loadFilesSync("./**/*.resolvers.*");
export default mergeResolvers(resolversArray);
