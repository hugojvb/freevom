import { useState } from "react";

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
  Divider,
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

  const classes = useStyles();

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
        <div ref={drop}>
          <CardContent>
            <Grid
              container
              spacing={2}
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
                <input
                  type="file"
                  accept="video/mp4"
                  className={classes.fileInput}
                  id="upload_file"
                />
                <label htmlFor="upload_file">
                  <Button variant="contained" color="primary" component="div">
                    Or select from your pc
                  </Button>
                </label>
              </Grid>
              <Divider />
              <Grid item>
                <List>
                  {droppedFiles.map((file) => (
                    <ListItem key={file.name}>
                      <Typography variant="h6" align="center">
                        {file.name}
                      </Typography>
                    </ListItem>
                  ))}
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
