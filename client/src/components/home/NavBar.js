import React, { useState } from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Container } from "@material-ui/core";

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
    <AppBar color="inherit" elevation={2}>
      <Container>
        <Toolbar>
          <Link
            component={RouterLink}
            color="inherit"
            to="/"
            style={{ textDecoration: "none" }}
          >
            <img
              src="https://i.ibb.co/gD9cMM8/logosmall.png"
              height="30"
              className={classes.logo}
              alt="logo"
            />
          </Link>

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
            !
          </Typography>
          <div className={classes.avatar}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar src={props.currentUser.image} />
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
      </Container>
    </AppBar>
  );
}
