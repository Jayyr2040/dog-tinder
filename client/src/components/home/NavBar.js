import React, { useState } from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

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

export default function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
          Howdy,{" "}
          {props.currentUser?.fullName ? props.currentUser?.fullName : "User"}
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
  );
}
