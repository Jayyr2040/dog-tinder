import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core/";
import { Paper } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export default function UpdateProfile(props) {
  const classes = useStyles();
  const [updateUser, setUpdateUser] = useState();
  const [buttonState, setButtonState] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(
    "https://image.flaticon.com/icons/png/512/848/848043.png"
  );
  const [loading, setLoading] = useState(false);
  const [fullNameError, setfullNameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const checkFormErrors = () => {
    setfullNameError(false);
    setLocationError(false);
    setDescriptionError(false);
    if (updateUser.fullName === "") {
      setfullNameError(true);
    }
    if (updateUser.location === "") {
      setLocationError(true);
    }
    if (updateUser.description === "") {
      setDescriptionError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkFormErrors();
    if (updateUser.image && updateUser.location && updateUser.description) {
      setButtonState(true);
      const createNewAccount = async () => {
        try {
          const res = await fetch(
            "http://localhost:3003/users/" + props.userId,
            {
              method: "PUT",
              body: JSON.stringify(updateUser),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          props.updateProfile();
          console.log(data);
        } catch (error) {
          console.log(error);
          setButtonState(false);
        }
      };
      createNewAccount();
    }
  };

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
            <Typography variant="h5">Update Account Details</Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <img
                  src={uploadedImage}
                  style={{ height: "280px", width: "280px" }}
                  alt=""
                />
              )}
              <Button
                variant="contained"
                component="label"
                color="secondary"
                style={{ maxWidth: "180px", maxHeight: "25px" }}
              >
                Upload File
                <input
                  type="file"
                  name="file"
                  placeholder="Upload an image"
                  onChange={uploadImage}
                  hidden
                />
              </Button>
              <TextField
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, fullName: e.target.value })
                }
                className={classes.field}
                label="Full Name"
                variant="outlined"
                error={fullNameError}
                fullWidth
              />{" "}
              <br />
              <TextField
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, location: e.target.value })
                } // destructure -> array setUpdateUser({ ...updateUser, location: ["North"]})
                className={classes.field}
                label="Location"
                variant="outlined"
                fullWidth
                error={locationError}
              />
              <br />
              <TextField
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, description: e.target.value })
                }
                className={classes.field}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                error={descriptionError}
              />
              <Button
                type="submit"
                className={classes.field}
                color="secondary"
                variant="contained"
                size="large"
                disabled={buttonState}
              >
                Update profile
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
