import { createTheme } from "@material-ui/core";

import "@fontsource/roboto";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f00",
    },
    secondary: {
      main: "#666",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
  },
});
