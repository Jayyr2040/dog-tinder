import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
  logo: {
    alignItems: "center",
    justify: "center",
  },
  footer: {
    marginTop: 40,
  },
});

export default function NewSessions(props) {
  const classes = useStyles();
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(signIn));
    const createNewLogin = async () => {
      const res = await fetch("/sessions", {
        method: "POST",
        body: JSON.stringify(signIn),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("user", data.currentUser);
      props.loggedInUserData(data.currentUser);
    };
    createNewLogin();
  };

  return (
    <Container>
      <Grid container justify="center">
        <img src="https://i.ibb.co/KjSLSwS/logo.png" height="60" alt="logo" />
      </Grid>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => setSignIn({ ...signIn, username: e.target.value })}
          className={classes.field}
          label="Username"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
          className={classes.field}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <br />
        <Button
          type="submit"
          className={classes.form}
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
        >
          <Typography style={{ fontWeight: 700 }}>Log in</Typography>
        </Button>
      </form>
      <Typography className={classes.footer} align="center" variant="subtitle2">
        Forgot password?
      </Typography>
    </Container>
  );
}
