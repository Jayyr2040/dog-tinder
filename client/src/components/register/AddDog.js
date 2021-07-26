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
    if (true) {
      console.log(JSON.stringify(dogData));
      const createDog = async () => {
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
          error={false}
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
          error={false}
          fullWidth
        /> */}
        <TextField
          onChange={(e) => setDogData({ ...dogData, breed: e.target.value })}
          label="Breed"
          variant="outlined"
          error={false}
          className={classes.field}
          fullWidth
        />
        <TextField
          onChange={(e) => setDogData({ ...dogData, sex: e.target.value })}
          label="Sex"
          variant="outlined"
          error={false}
          className={classes.field}
          fullWidth
        />
        <TextField
          onChange={(e) => setDogData({ ...dogData, yob: e.target.value })}
          label="Year of Birth"
          variant="outlined"
          error={false}
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
          error={false}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="large"
          className={classes.field}
        >
          Add dog
        </Button>
      </form>
    </Container>
  );
}
