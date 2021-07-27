import { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from "@material-ui/core";
import Matches from "./pages/Matches";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF9B01",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginTop: 70,
  },
  links: {
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    marginRight: 30,
  },
  avatar: {
    marginLeft: 10,
  },
}));

function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState();
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl); // from material-ui docs, I've no idea what this is doing

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/sessions/check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("check useEffect server response", data);
      if (data.currentUser === undefined) {
        setLoggedInStatus(false);
      } else {
        setCurrentUser(data.currentUser);
        setLoggedInStatus(true);
      }
    };
    fetchSession();
  }, []);

  const loggedInUserData = (userData) => {
    console.log("loggedInUserData", userData);
    setCurrentUser(userData);
    setLoggedInStatus(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    //  console.log(JSON.stringify(signUp));
    const deleteLogin = async () => {
      const res = await fetch("/sessions", {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("session deleted", data);
    };
    deleteLogin();
    window.location.reload();
  };

  return (
    <div className={classes.toolbar}>
      <ThemeProvider theme={theme}>
        <AppBar color="inherit">
          <Toolbar>
            <Typography className={classes.logo} style={{ fontWeight: 700 }}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/"
                style={{ textDecoration: "none" }}
              >
                Dog Tinder
              </Link>
            </Typography>
            <Typography className={classes.links}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/browse"
                style={{ textDecoration: "none" }}
              >
                Browse
              </Link>
            </Typography>
            <Typography className={classes.title}>
              <Link
                component={RouterLink}
                color="inherit"
                to="/matches"
                style={{ textDecoration: "none" }}
              >
                Matches
              </Link>
            </Typography>
            <Typography>
              Howdy, {currentUser?.fullName ? currentUser?.fullName : "User"}
            </Typography>
            <div className={classes.avatar}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            {loggedInStatus ? (
              <Redirect to="/browse" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/register">
            <Register />
            {loggedInStatus && <Redirect to="/browse" />}
          </Route>
          <Route path="/login">
            <Login loggedInUserData={loggedInUserData} />
            {loggedInStatus && <Redirect to="/browse" />}
          </Route>
          <Route path="/browse">
            {loggedInStatus ? <Browse /> : <Redirect to="/login" />}
          </Route>
          <Route path="/matches">
            {loggedInStatus ? <Matches /> : <Redirect to="/login" />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
