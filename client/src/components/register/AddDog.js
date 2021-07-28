import React, { useState } from "react";
import { makeStyles, MenuItem } from "@material-ui/core";
import Container from "@material-ui/core/Container";
// import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Textfield from "./FormsUI/Textfield";
import { Radio } from "@material-ui/core";
import { Select } from "@material-ui/core";
import Button from "./FormsUI/Button";
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
  name: "",
  breed: "",
  image: "",
  sex: "",
  yob: null,
  description: "",
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  breed: Yup.string(),
  image: Yup.string(),
  sex: Yup.string().required("Required"),
  yob: Yup.number().min(2000).max(2019),
  description: Yup.string(),
});

export default function AddDog(props) {
  const classes = useStyles();
  const [displayImage, setDisplayImage] = useState(
    "https://image.flaticon.com/icons/png/512/1581/1581594.png"
  );
  const [uploadImage, setUploadImage] = useState("");
  const [dogData, setDogData] = useState({
    sex: "Female",
    owner: props.userId,
  });
  const [loading, setLoading] = useState(false);

  const upload = () => {
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("upload_preset", "dog_tinder_users");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dsag331qk/image/upload",
      formData
    ).then((response) => {
      setDisplayImage(response.data.secure_url);
    });
  };

  const handleSubmit = (formValue) => {
    const createDog = async () => {
      try {
        const res = await fetch("http://localhost:3003/dogs/", {
          method: "POST",
          body: JSON.stringify(formValue),
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
              {loading ? (
                <CircularProgress />
              ) : (
                <Image
                  cloudName="dsag331qk"
                  style={{ height: "280px", width: "280px" }}
                  publicId={displayImage}
                />
              )}
              <input
                name="image"
                type="file"
                onChange={(e) => {
                  setUploadImage(e.target.files[0]);
                }}
              />
              <button onClick={upload}>Upload Image</button>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={handleSubmit}
                // onSubmit={(data, { setSubmitting }) => {
                //   setSubmitting(true);
                //   console.log("submit: ", data);
                //   setSubmitting(false);
                // }}
              >
                {/* {({ values, errors }) => ( */}
                  <Form>
                    <Textfield
                      name="image"
                      value={displayImage}
                      className={classes.field}
                    />
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
                    <div className="sex">
                      <label>
                        <Field
                          name="sex"
                          type="radio"
                          value="Male"
                          as={Radio}
                        />
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
