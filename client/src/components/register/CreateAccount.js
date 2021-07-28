import React from "react";
import { makeStyles } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "./FormsUI/Textfield";
import Button from "./FormsUI/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  paper: {
    margin: theme.spacing(1),
    padding: 40,
  },
  field: {
    marginBottom: 20,
  },
}));

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  fullName: "",
  email: "",
};

// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string()
    .required("Required")
    .test(
      "username-backend-validation",
      "Username is taken",
      async (username) => {
        const {
          data: { success },
        } = await axios.post("http://localhost:3003/register/validUsername", {
          username: username,
        });
        return success;
      }
    ),
  password: Yup.string().required("Required"), // .matches(PASSWORD_REGEX, "Please enter a strong password")
  fullName: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email.")
    .required("Required")
    .test(
      "email-backend-validation",
      "Email address is taken",
      async (email) => {
        const {
          data: { success },
        } = await axios.post("http://localhost:3003/register/validEmail", {
          email: email,
        });
        return success;
      }
    ),
});

export default function CreateAccount(props) {
  const classes = useStyles();

  const handleSubmit = (formValue) => {
    const createNewAccount = async () => {
      try {
        const res = await fetch("http://localhost:3003/users", {
          method: "POST",
          body: JSON.stringify(formValue),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        props.registerNewUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    createNewAccount();
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
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" align="center">
              Sign up for account
            </Typography>
            <div className={classes.formWrapper}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Textfield
                    name="username"
                    label="Username"
                    className={classes.field}
                  />
                  <Textfield
                    name="password"
                    label="Password"
                    className={classes.field}
                  />
                  <Textfield
                    name="fullName"
                    label="Full Name"
                    className={classes.field}
                  />
                  <Textfield
                    name="email"
                    label="Email"
                    className={classes.field}
                  />
                  <Button>Submit Form</Button>
                </Form>
              </Formik>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
