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
  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
  });


  
  const handleSubmit = (e) => {
    e.preventDefault();
   
    //  console.log(JSON.stringify(signUp));
      const createNewLogin = async () => {
        const res = await fetch("http://localhost:3003/sessions", {
          method: "POST",
          body: JSON.stringify(signUp),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("user", data.currentUser);
        console.log("dog", data.dog._id);
        props.setCurrentData(data.dog._id);
      };
      createNewLogin();
    
  };

const handleDelete = (e) => {
    e.preventDefault();
   
    //  console.log(JSON.stringify(signUp));
      const deleteLogin = async () => {
        const res = await fetch("http://localhost:3003/sessions", {
          method: "DELETE",
        });
        const data = await res.json();
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
          onChange={(e) => setSignUp({ ...signUp, username: e.target.value })}
          className={classes.field}
          label="username"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
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
       {props.currentData}
    </Container>
  );
}
