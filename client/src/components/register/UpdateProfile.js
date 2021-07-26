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

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateProfile();
    if (updateUser.image && updateUser.location && updateUser.description) {
      console.log(JSON.stringify(updateUser));
      fetch("http://localhost:3003/users/" + props.userId, {
        method: "PUT",
        body: JSON.stringify(updateUser),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
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
          error={false}
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
          error={false}
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
          error={false}
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
          error={false}
        />
        <Button
          type="submit"
          className={classes.field}
          color="secondary"
          variant="contained"
          size="large"
        >
          Update profile
        </Button>
      </form>
    </Container>
  );
}
