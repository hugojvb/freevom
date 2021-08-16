import { useState } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

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

  const isActive = canDrop && isOver;

  return (
    <>
      <div ref={drop}>{isActive ? "Release to drop" : "Drag a file here"}</div>
      <div>
        {droppedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </div>
    </>
  );
};

export default Upload;
