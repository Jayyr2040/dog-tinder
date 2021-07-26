import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
});

export default function UpdateProfile(props) {
  const classes = useStyles();
  const [updateUser, setUpdateUser] = useState();
  const [buttonState, setButtonState] = useState(false);

  const [fullNameError, setfullNameError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const checkFormErrors = () => {
    setfullNameError(false);
    setImageError(false);
    setLocationError(false);
    setDescriptionError(false);
    if (updateUser.fullName === "") {
      setfullNameError(true);
    }
    if (updateUser.image === "") {
      setImageError(true);
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

  return (
    <Container>
      <h2>Update account details</h2>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
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
            setUpdateUser({ ...updateUser, image: e.target.value })
          }
          className={classes.field}
          label="Image"
          variant="outlined"
          fullWidth
          error={imageError}
        />
        <br />
        <TextField
          onChange={(e) =>
            setUpdateUser({ ...updateUser, location: e.target.value })
          }
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
    </Container>
  );
}
