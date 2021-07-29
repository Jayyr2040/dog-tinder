import { Grid, makeStyles, Paper, Typography } from "@material-ui/core/";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Button from "./FormsUI/Button";
import Textfield from "./FormsUI/Textfield";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: 35,
  },
  field: {
    marginTop: 10,
    textAlign: "center",
    color: "grey",
  },
}));

const INITIAL_FORM_STATE = {
  image: "",
  fullName: "",
  description: "",
  location: [],
};

const FORM_VALIDATION = Yup.object().shape({
  image: Yup.string(),
  fullName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  location: Yup.array(),
});

export default function UpdateProfile(props) {
  const classes = useStyles();
  const [displayImage, setDisplayImage] = useState(
    "https://i.ibb.co/jg6GNTb/user.png"
  );
  const [uploadImage, setUploadImage] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = () => {
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("upload_preset", "dog_tinder_users");
    setLoading(true);

    Axios.post(
      "https://api.cloudinary.com/v1_1/dsag331qk/image/upload",
      formData
    ).then((response) => {
      setDisplayImage(response.data.secure_url);
      setLoading(false);
    });
  };

  const handleSubmit = (formValue) => {
    const imageURL = { image: displayImage };
    let merge = { ...formValue, ...imageURL };
    console.log(merge);
    const createNewAccount = async () => {
      try {
        const res = await fetch("/users/" + props.userData._id, {
          method: "PUT",
          body: JSON.stringify(merge),
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
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Grid container justify="center">
              <img
                src="https://i.ibb.co/KjSLSwS/logo.png"
                height="60"
                alt="logo"
              />
            </Grid>
            <Typography
              variant="body1"
              align="center"
              style={{ color: "grey", marginTop: 10, marginBottom: 20 }}
            >
              Describe a little about yourself
            </Typography>
            <div className={classes.formWrapper}>
              <div className="image-uploader">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Image
                    cloudName="dsag331qk"
                    style={{ height: "280px", width: "280px" }}
                    publicId={displayImage}
                  />
                )}
                <div>
                  <input
                    name="image"
                    type="file"
                    onChange={(e) => {
                      setUploadImage(e.target.files[0]);
                    }}
                    accept=".jpg,.jpeg,.gif,.png"
                  />
                </div>
                <button onClick={upload} class="upload-image-btn">
                  Upload Image
                </button>
              </div>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
              >
                <Form>
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
                  <div className={classes.field}>
                    <Typography variant="body1" color="inherit">
                      Preferred Location(s):
                    </Typography>
                    <div className="checkboxes-row-1">
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
                    </div>
                    <div className="checkboxes-row-2">
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
                  </div>
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
