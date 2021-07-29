import {
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  Select,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Button from "./FormsUI/Button";
import Textfield from "./FormsUI/Textfield";
import { useHistory } from "react-router-dom";

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
  name: "",
  breed: "",
  sex: "",
  yob: null,
  description: "",
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  breed: Yup.string(),
  sex: Yup.string().required("Required"),
  yob: Yup.number().min(2010).max(2019),
  description: Yup.string(),
});

export default function AddDog(props) {
  const classes = useStyles();
  const history = useHistory();
  const [displayImage, setDisplayImage] = useState(
    "https://i.ibb.co/t8dfPCM/pawprint.png"
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
    const ownerUsername = { ownerUsername: props.userData.username };
    let merge = { ...formValue, ...imageURL, ...ownerUsername };
    console.log(merge);
    const createDog = async () => {
      try {
        const res = await fetch("/dogs/", {
          method: "POST",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        props.addDog(data);
      } catch (error) {
        console.log(error);
      }
    };
    createDog();
    history.push("/");
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
              Tell us more about your lovely doggo
            </Typography>
            <div className={classes.formWrapper}>
              <div className="image-uploader">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Image
                    cloudName="dsag331qk"
                    style={{ maxWidth: "280px" }}
                    publicId={displayImage}
                  />
                )}
                <input
                  name="image"
                  type="file"
                  onChange={(e) => {
                    setUploadImage(e.target.files[0]);
                  }}
                  accept=".jpg,.jpeg,.gif,.png"
                />
              </div>
              <div className="image-uploader">
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
                    name="name"
                    label="Name"
                    className={classes.field}
                  />
                  <Textfield
                    name="yob"
                    label="Year of Birth"
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
                      Breed:
                    </Typography>
                    <Field
                      name="breed"
                      type="select"
                      placeholder="breed"
                      fullWidth
                      as={Select}
                    >
                      <MenuItem value="Pomeranian">Pomeranian</MenuItem>
                      <MenuItem value="Dachshund">Dachshund</MenuItem>
                    </Field>
                  </div>
                  <div className={classes.field}>
                    <Typography variant="body1" color="inherit">
                      Sex:
                    </Typography>
                    <label>
                      <Field name="sex" type="radio" value="Male" as={Radio} />
                      Male
                    </label>
                    <label>
                      <Field
                        name="sex"
                        type="radio"
                        value="Female"
                        as={Radio}
                      />
                      Female
                    </label>
                  </div>
                  <Button type="submit" variant="contained" color="secondary">
                    Submit
                  </Button>
                </Form>
              </Formik>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
