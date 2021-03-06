import React from "react";
import "./App.css";
import Routing from "./Routing";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./theme";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <Routing />
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
