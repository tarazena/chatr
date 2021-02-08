import React, { FC } from "react";
import { ApolloProvider } from "./ApolloProvider";
import { ThemeProvider } from "./ThemeProvider";

export const ContextProvider: FC = ({ children }) => (
  <ApolloProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </ApolloProvider>
);
