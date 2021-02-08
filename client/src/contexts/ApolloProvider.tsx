import { ApolloProvider as APO } from "@apollo/client";
import { FC } from "react";

import { client } from "../graphql";

export const ApolloProvider: FC = ({ children }) => {
  return <APO client={client}>{children}</APO>;
};
