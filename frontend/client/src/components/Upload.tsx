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
  Snackbar,
  Fade,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import axios from "axios";

const useStyles = makeStyles((theme) => {
  return {
    fileInput: {
      display: "none",
    },
  };
});

const Upload = () => {
  const [droppedFile, setDroppedFile] = useState<File[]>([]);
  const [chosenFile, setChosenFile] = useState<File[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const classes = useStyles();

  // HANDLE DROP
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item: { files: any[] }) {
      setChosenFile([]);
      setDroppedFile(item.files);
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
    setDroppedFile([]);
    if (target.files) setChosenFile([target.files[0]]);
  };

  // SUBMIT UPLOAD
  const submitUpload = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      var bodyFormData = new FormData();
      if (droppedFile.length !== 0) {
        bodyFormData.append("file", droppedFile[0]);
      } else if (chosenFile.length !== 0) {
        bodyFormData.append("file", chosenFile[0]);
      }

      await axios.post("/api/video", bodyFormData);
      setDroppedFile([]);
      setChosenFile([]);
      setIsUploading(false);
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 3000);
    } catch (error) {
      setIsUploading(false);
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 3000);
    }
  };

  // HANDLE SNACKBAR CLOSE
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessAlert(false);
  };

  return (
    <Container maxWidth="md">
      <Card
        style={{ backgroundColor: isActive ? "#eee" : "#fff" }}
        elevation={1}
      >
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
                  {droppedFile.length > 0
                    ? droppedFile.map((file) => (
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
      <Snackbar TransitionComponent={Fade} open={successAlert}>
        <Alert onClose={handleClose} severity="success">
          Your video was uploaded successfully
        </Alert>
      </Snackbar>
      <Snackbar TransitionComponent={Fade} open={errorAlert}>
        <Alert onClose={handleClose} severity="error">
          Something went wrong
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Upload;
