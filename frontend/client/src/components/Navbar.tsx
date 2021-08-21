import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    navbarContainer: {
      marginBottom: "2em",
    },
    brand: {
      flexGrow: 1,
    },
  })
);

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      color="secondary"
      className={classes.navbarContainer}
    >
      <Toolbar>
        <Typography className={classes.brand} variant="h6">
          Hello
        </Typography>
        <Typography variant="h6">Icon</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
