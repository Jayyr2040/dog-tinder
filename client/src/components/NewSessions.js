import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
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

  const handleDelete = (e) => {
    e.preventDefault();
    //  console.log(JSON.stringify(signUp));
    const deleteLogin = async () => {
      const res = await fetch("/sessions", {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("session deleted", data);
    };
    deleteLogin();
  };

  return (
    <Container>
      <h2>Login for account</h2>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => setSignIn({ ...signIn, username: e.target.value })}
          className={classes.field}
          label="username"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
          className={classes.field}
          label="password"
          variant="outlined"
          fullWidth
        />
        <br />
        <Button
          type="submit"
          className={classes.field}
          color="secondary"
          variant="contained"
          size="large"
        >
          Login
        </Button>
      </form>
      <Button
        type="submit"
        className={classes.field}
        color="secondary"
        variant="contained"
        size="large"
        onClick={handleDelete}
      >
        Login Out
      </Button>
    </Container>
  );
}
