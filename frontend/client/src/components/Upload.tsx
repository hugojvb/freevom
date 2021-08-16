import { useState } from "react";

import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

import { Card, CardContent, Container, Typography } from "@material-ui/core";

const Upload = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

  // HANDLE DROP
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item: { files: any[] }) {
      setDroppedFiles(item.files);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // INDICATE WHEN DROPPABLE
  const isActive = canDrop && isOver;

  return (
    <Container maxWidth="md">
      <Card style={{ backgroundColor: isActive ? "#eee" : "#fff" }}>
        <CardContent>
          <div ref={drop}>
            <Typography align="center">
              {isActive ? "Release to drop" : "Drag a file here"}
            </Typography>
          </div>
          {droppedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Upload;
