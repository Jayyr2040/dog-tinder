import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
});

export default function AddDog(props) {
  const classes = useStyles();
  const [uploadedImage, setUploadedImage] = useState("https://image.flaticon.com/icons/png/512/1581/1581594.png");
  const [dogData, setDogData] = useState({ owner: props.userId });
  const [buttonState, setButtonState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dogNameError, setDogNameError] = useState(false);
  const [breedError, setBreedError] = useState(false);
  const [sexError, setSexError] = useState(false);
  const [yobError, setYobError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const checkFormErrors = () => {
    setDogNameError(false);
    setBreedError(false);
    setSexError(false);
    setYobError(false);
    setDescriptionError(false);
    if (dogData.name === "") {
      setDogNameError(true);
    }
    if (dogData.breed === "") {
      setBreedError(true);
    }
    if (dogData.sex === "") {
      setBreedError(true);
    }
    if (dogData.yob === 0) {
      setBreedError(true);
    }
    if (dogData.description === "") {
      setDescriptionError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dogData);
    checkFormErrors();
    if (
      dogData.name &&
      dogData.image &&
      dogData.breed &&
      dogData.sex &&
      dogData.yob &&
      dogData.description
    ) {
      setButtonState(true);
      const createDog = async () => {
        try {
          const res = await fetch("http://localhost:3003/dogs/", {
            method: "POST",
            body: JSON.stringify(dogData),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log(data);
          props.addDog(data);
        } catch (error) {
          console.log(error);
          setButtonState(false);
        }
      };
      createDog();
    } else {
      console.log("Add dog failed");
    }
  };

  const uploadImage = (e) => {
    const fetchImageURL = async () => {
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "dogtinder");
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
      setDogData({ ...dogData, image: file.secure_url });
      setLoading(false);
    };
    fetchImageURL();
  };

  return (
    <Container>
      <h2>Add your dog</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          placeholder="Upload an image"
          onChange={uploadImage}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <img
            src={uploadedImage}
            style={{ height: "280px", width: "280px" }}
            alt=""
          />
        )}
        <TextField
          onChange={(e) => setDogData({ ...dogData, name: e.target.value })}
          label="Name of Doggo"
          variant="outlined"
          error={dogNameError}
          fullWidth
          className={classes.field}
        />
        {/* <TextField
          onChange={(e) => setDogData({ ...dogData, image: e.target.value })}
          label="Image"
          className={classes.field}
          variant="outlined"
          error={dogImageError}
          fullWidth
        /> */}
        <TextField
          onChange={(e) => setDogData({ ...dogData, breed: e.target.value })}
          label="Breed"
          variant="outlined"
          error={breedError}
          className={classes.field}
          fullWidth
        />
        <TextField
          onChange={(e) => setDogData({ ...dogData, sex: e.target.value })}
          label="Sex"
          variant="outlined"
          error={sexError}
          className={classes.field}
          fullWidth
        />
        <TextField
          onChange={(e) => setDogData({ ...dogData, yob: e.target.value })}
          label="Year of Birth"
          variant="outlined"
          error={yobError}
          className={classes.field}
          type="number"
          fullWidth
        />
        <TextField
          onChange={(e) =>
            setDogData({ ...dogData, description: e.target.value })
          }
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          className={classes.field}
          error={descriptionError}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="large"
          className={classes.field}
          disabled={buttonState}
        >
          Add dog
        </Button>
      </form>
    </Container>
  );
}
