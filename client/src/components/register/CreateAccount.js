import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: 40,
  },
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
}));

export default function CreateAccount(props) {
  const classes = useStyles();
  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
  });
  const [buttonState, setButtonState] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [fullNameError, setfullNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const checkFormErrors = () => {
    setEmailError(false);
    setfullNameError(false);
    setUsernameError(false);
    setPasswordError(false);
    if (signUp.email === "") {
      setEmailError(true);
    }
    if (signUp.fullName === "") {
      setfullNameError(true);
    }
    if (signUp.username === "") {
      setUsernameError(true);
    }
    if (signUp.password === "") {
      setPasswordError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkFormErrors();
    if (signUp.email && signUp.fullName && signUp.username && signUp.password) {
      setButtonState(true);
      const createNewAccount = async () => {
        try {
          const res = await fetch("http://localhost:3003/users", {
            method: "POST",
            body: JSON.stringify(signUp),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          props.registerNewUser(data);
          console.log(data);
        } catch (error) {
          setButtonState(false);
          console.log(error);
        }
      };
      createNewAccount();
    }
  };
  return (
    <Container>
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={5} className={classes.paper}>
          <Typography variant="h5">Sign up for account</Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                onChange={(e) =>
                  setSignUp({ ...signUp, email: e.target.value })
                }
                className={classes.field}
                label="Email"
                variant="outlined"
                error={emailError}
                fullWidth
              />
              <br />
              <TextField
                onChange={(e) =>
                  setSignUp({ ...signUp, fullName: e.target.value })
                }
                className={classes.field}
                label="Full Name"
                variant="outlined"
                error={fullNameError}
                fullWidth
              />
              <br />
              <TextField
                onChange={(e) =>
                  setSignUp({ ...signUp, username: e.target.value })
                }
                className={classes.field}
                label="Username"
                variant="outlined"
                error={usernameError}
                fullWidth
              />
              <br />
              <TextField
                onChange={(e) =>
                  setSignUp({ ...signUp, password: e.target.value })
                }
                className={classes.field}
                label="Password"
                variant="outlined"
                type="password"
                error={passwordError}
                fullWidth
              />
              <br />
              <br />
              <Button
                type="submit"
                className={classes.field}
                color="secondary"
                variant="contained"
                size="large"
                disabled={buttonState}
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
