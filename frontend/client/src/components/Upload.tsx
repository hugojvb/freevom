import { useState, useRef, useEffect } from "react";

import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

import {
  Card,
  CardContent,
  Container,
  Typography,
  List,
  ListItem,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    fileInput: {
      display: "none",
    },
  };
});

const Upload = () => {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [chosenFile, setChosenFile] = useState<FileList | null>();
  const [mounted, setMounted] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const classes = useStyles();

  // HANDLE DROP
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item: { files: any[] }) {
      setDroppedFiles(item.files);
      setChosenFile(null);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // INDICATE WHEN DROPPABLE
  const isActive = canDrop && isOver;

  // MOUNTED COMPONENT
  useEffect(() => {
    setMounted(true);
  });

  console.log("render");

  const handleFileChange = (target: HTMLInputElement) => {
    setChosenFile(target.files);
    setDroppedFiles([]);
  };

  return (
    <Container maxWidth="md">
      <Card style={{ backgroundColor: isActive ? "#eee" : "#fff" }}>
        <div ref={drop}>
          <CardContent>
            <Grid
              container
              spacing={5}
              direction="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item>
                <Typography align="center">
                  {isActive ? "Release to drop" : "Drag a file here"}
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="center">OR</Typography>
              </Grid>
              <Grid item>
                {mounted && (
                  <input
                    type="file"
                    accept="video/mp4"
                    className={classes.fileInput}
                    id="upload_file"
                    ref={fileInput}
                    onChange={(e) => handleFileChange(e.target)}
                  />
                )}
                <label htmlFor="upload_file">
                  <Button variant="contained" color="primary" component="span">
                    Select a file
                  </Button>
                </label>
              </Grid>
              <Grid item>
                <List>
                  {droppedFiles.length > 0
                    ? droppedFiles.map((file) => (
                        <ListItem key={file.name}>
                          <Typography variant="h6" align="center">
                            {file.name}
                          </Typography>
                        </ListItem>
                      ))
                    : chosenFile && (
                        <ListItem>
                          <Typography variant="h6" align="center">
                            {chosenFile[0].name}
                          </Typography>
                        </ListItem>
                      )}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </div>
      </Card>
    </Container>
  );
};

export default Upload;
