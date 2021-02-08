import React, { FC } from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import { theme } from "../styles";

export const ThemeProvider: FC = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
