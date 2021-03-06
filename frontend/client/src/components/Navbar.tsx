import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VideoCallIcon from "@material-ui/icons/VideoCall";

const useStyles = makeStyles((theme) =>
  createStyles({
    navbarContainer: {
      marginBottom: "2em",
      backgroundColor: "#fff",
    },
    menuButton: {
      marginRight: ".5em",
    },
    brand: {
      flexGrow: 1,
      cursor: "pointer",
    },
  })
);

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" elevation={0} className={classes.navbarContainer}>
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.brand} variant="h6" color="primary">
          Freevom
        </Typography>
        <IconButton>
          <VideoCallIcon />
        </IconButton>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
