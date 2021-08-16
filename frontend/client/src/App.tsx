import React from "react";
import "./App.css";
import Routing from "./Routing";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Routing />
      </DndProvider>
    </>
  );
}

export default App;
