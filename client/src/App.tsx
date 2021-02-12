import { Container } from "@material-ui/core";
import React, { FC } from "react";

import { Chat } from "./components";


export const App: FC = () => {
  return (
    <Container>
      <main>
        <Chat />
      </main>
    </Container>
  );
};
