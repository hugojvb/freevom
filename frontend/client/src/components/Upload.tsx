import { useState, useRef, useEffect, SyntheticEvent } from "react";

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
import axios from "axios";

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
  const [mounted, setMounted] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const classes = useStyles();

  // HANDLE DROP
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item: { files: any[] }) {
      setChosenFile(null);
      setDroppedFiles(item.files);
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
  }, [setMounted]);

  // FILE INPUT CHANGE
  const handleFileChange = (target: HTMLInputElement) => {
    setDroppedFiles([]);
    setChosenFile(target.files);
  };

  const submitUpload = async (e: SyntheticEvent) => {
    e.preventDefault();
    var bodyFormData = new FormData();
    if (droppedFiles !== undefined) {
      bodyFormData.append("file", droppedFiles[0]);
    }
    const res = await axios.post("/api/video", bodyFormData);
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
                    accept="video/*"
                    className={classes.fileInput}
                    id="upload_file"
                    ref={fileInput}
                    onChange={(e) => handleFileChange(e.target)}
                  />
                )}
                <label htmlFor="upload_file">
                  <Button variant="outlined" color="secondary" component="span">
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
                        <ListItem key={chosenFile[0]?.name}>
                          <Typography variant="h6" align="center">
                            {chosenFile[0]?.name}
                          </Typography>
                        </ListItem>
                      )}
                </List>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitUpload}
                  component="button"
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </div>
      </Card>
    </Container>
  );
};

export default Upload;
