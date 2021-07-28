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
import Axios from "axios";
import { Image } from "cloudinary-react";

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
    "https://image.flaticon.com/icons/png/512/848/848043.png"
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
        const res = await fetch("http://localhost:3003/users/" + props.userId, {
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
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" align="center">
              Sign up for account
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
                  <div className="checkboxes">
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
