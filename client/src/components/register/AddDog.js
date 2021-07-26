import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [dogData, setDogData] = useState({
    name: "",
    image: "",
    breed: "",
    sex: "",
    yob: 0,
    description: "",
    owner: props.userId,
  });
  const [buttonState, setButtonState] = useState(false);

  const [dogNameError, setDogNameError] = useState(false);
  const [dogImageError, setDogImageError] = useState(false);
  const [breedError, setBreedError] = useState(false);
  const [sexError, setSexError] = useState(false);
  const [yobError, setYobError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const checkFormErrors = () => {
    setDogNameError(false);
    setDogImageError(false);
    setBreedError(false);
    setSexError(false);
    setYobError(false);
    setDescriptionError(false);
    if (dogData.name === "") {
      setDogNameError(true);
    }
    if (dogData.image === "") {
      setDogImageError(true);
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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkFormErrors();
    if (
      dogData.name &&
      dogData.image &&
      dogData.breed &&
      dogData.sex &&
      dogData.sex &&
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
    }
  };

  return (
    <Container>
      <h2>Add your dog</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setDogData({ ...dogData, name: e.target.value })}
          label="Name of Doggo"
          variant="outlined"
          error={dogNameError}
          fullWidth
          className={classes.field}
        />
        <br />
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
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
