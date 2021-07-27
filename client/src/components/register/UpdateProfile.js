import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core/";
import { Paper } from "@material-ui/core/";
import { Typography } from "@material-ui/core/";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

let chosenLocations = [];

export default function UpdateProfile(props) {
  const classes = useStyles();
  const [updateUser, setUpdateUser] = useState({
    location: chosenLocations,
  });
  const [buttonState, setButtonState] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(
    "https://image.flaticon.com/icons/png/512/848/848043.png"
  );
  const [loading, setLoading] = useState(false);
  const [fullNameError, setfullNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const checkFormErrors = () => {
    setfullNameError(false);
    setDescriptionError(false);
    if (updateUser.fullName === "") {
      setfullNameError(true);
    }
    if (updateUser.description === "") {
      setDescriptionError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const location of locations) {
      if (e.target.elements[location].checked) {
        chosenLocations = [...chosenLocations, location];
      }
      setUpdateUser({ ...updateUser, location: chosenLocations });
    }
    console.log(chosenLocations);
    checkFormErrors();
    if (updateUser.description) {
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

  const locations = ["North", "South", "East", "West", "Central"];
  const checkboxes = locations.map((location) => (
    <FormControlLabel
      name={location}
      value={location}
      control={<Checkbox />}
      label={location}
    />
  ));

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
              <Typography variant="body1" color="textSecondary" align="left" >
                Preferred Locations:
              </Typography>
              {checkboxes}
              <TextField
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, fullName: e.target.value })
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
