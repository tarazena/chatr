import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { FC } from "react";

import { Chat, Login } from "./components";

export const App: FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
