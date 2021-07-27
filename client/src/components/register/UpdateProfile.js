import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core/";
import { Paper } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Textfield from "./FormsUI/Textfield";
import Button from "./FormsUI/Button";
import Checkbox from "@material-ui/core/Checkbox";

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
  // image: "",
  fullName: "",
  description: "",
  location: [],
};

const FORM_VALIDATION = Yup.object().shape({
  // image: Yup.string(),
  fullName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  location: Yup.array(),
});

export default function UpdateProfile(props) {
  const classes = useStyles();
  const [updateUser, setUpdateUser] = useState({});
  const [uploadedImage, setUploadedImage] = useState(
    "https://image.flaticon.com/icons/png/512/848/848043.png"
  );
  const [loading, setLoading] = useState(false);

  const uploadImage = (e) => {
    const fetchImageURL = async () => {
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "dog_tinder_users");
      setLoading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsag331qk/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const file = await res.json();
      console.log(file.secure_url);

      setUploadedImage(file.secure_url);
      setUpdateUser({ ...updateUser, image: file.secure_url });
      setLoading(false);
    };
    fetchImageURL();
  };

  const handleSubmit = (formValue) => {
    const createNewAccount = async () => {
      try {
        const res = await fetch("http://localhost:3003/users/" + props.userId, {
          method: "PUT",
          body: JSON.stringify(formValue),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        props.updateProfile();
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
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5">Sign up for account</Typography>
            <div className={classes.formWrapper}>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              //   onSubmit={(data, { setSubmitting }) => {
              //     setSubmitting(true);
              //     console.log("submit: ", data);
              //     setSubmitting(false);
              //   }}
              >
             {/* {({ values, errors }) => ( */}
                  <Form>
                    {/* {loading ? (
                    <CircularProgress />
                  ) : (
                    <img
                      src={uploadedImage}
                      style={{ height: "280px", width: "280px" }}
                      alt=""
                    />
                  )}
                  <input
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                  /> */}
                    <Textfield
                      name="fullName"
                      label="Full Name"
                      className={classes.field}
                    />
                    <Textfield
                      name="description"
                      label="Description"
                      className={classes.field}
                      multiline={true}
                      rows={4}
                    />
                    <div>
                      <label>
                        <Field
                          name="location"
                          type="checkbox"
                          placeholder="North"
                          value="North"
                          as={Checkbox}
                        />
                        North
                      </label>
                      <label>
                        <Field
                          name="location"
                          type="checkbox"
                          placeholder="South"
                          value="South"
                          as={Checkbox}
                        />
                        South
                      </label>
                      <label>
                        <Field
                          name="location"
                          type="checkbox"
                          placeholder="East"
                          value="East"
                          as={Checkbox}
                        />
                        East
                      </label>
                      <label>
                        <Field
                          name="location"
                          type="checkbox"
                          placeholder="West"
                          value="West"
                          as={Checkbox}
                        />
                        West
                      </label>
                      <label>
                        <Field
                          name="location"
                          type="checkbox"
                          placeholder="Central"
                          value="Central"
                          as={Checkbox}
                        />
                        Central
                      </label>
                    </div>
                    <Button>Submit Form</Button>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                    <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                  </Form>
                {/* )} */}
              </Formik>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}