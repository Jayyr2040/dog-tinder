import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core/";
import Avatar from "@material-ui/core/Avatar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Image } from "cloudinary-react";
import Axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    margin: theme.spacing(1),
    padding: 40,
    maxWidth: "100%",
  },
  form: {
    marginTop: 20,
  },
  field: {
    marginTop: 10,
  },
  avatar: {
    height: 280,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  formlabel: {
    fontSize: 12,
  },
}));

export default function AccountSettings(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log("settings - currentUser", props?.currentUser);
  console.log("settings - currentDog", props?.currentUserDog);
  const currentUser = props?.currentUser;
  const currentUserDog = props?.currentUserDog;
  const [changeUserData, setChangeUserData] = React.useState({
    fullName: currentUser.fullName,
    image: currentUser.image,
    email: currentUser.email,
    location: currentUser.location,
    description: currentUser.description,
  });
  // checkboxes
  const [state, setState] = React.useState({
    checkedA: currentUser.location.includes("North") ? true : false,
    checkedB: currentUser.location.includes("South") ? true : false,
    checkedC: currentUser.location.includes("East") ? true : false,
    checkedD: currentUser.location.includes("West") ? true : false,
    checkedE: currentUser.location.includes("Central") ? true : false,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // checkboxes
  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  ///// radio buttons
  const [value1, setValue1] = React.useState();

  const handleChangeRadio = (event) => {
    setValue1(event.target.value);
    console.log(value1);
  };

  // Upload Userimage
  const [displayImageUser, setDisplayImageUser] = React.useState(
    "https://image.flaticon.com/icons/png/512/848/848043.png"
  );
  const [uploadImageUser, setUploadImageUser] = React.useState("");
  const [loadingUser, setLoadingUser] = React.useState(false);

  const uploadUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadImageUser);
    formData.append("upload_preset", "dog_tinder_users");
    console.log("formData", formData);
    setLoadingUser(true);

    Axios.post(
      "https://api.cloudinary.com/v1_1/dsag331qk/image/upload",
      formData
    ).then((response) => {
      setDisplayImageUser(response.data.secure_url);
      //   setLoading(false);
    });
  };

  const handleSubmitUser = (e, formValue) => {
    e.preventDefault();
    const imageURL = { image: displayImageUser };
    let merge = { ...formValue, ...imageURL };
    console.log(merge);
    const createNewAccount = async () => {
      try {
        const res = await fetch("/users/" + currentUser._id, {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // props.updateProfile();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    createNewAccount();
  };

  // Upload Dogimage
  const [displayImageDog, setDisplayImageDog] = React.useState(
    "https://image.flaticon.com/icons/png/512/848/848043.png"
  );
  const [uploadImageDog, setUploadImageDog] = React.useState("");
  const [loadingDog, setLoadingDog] = React.useState(false);

  const uploadDog = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadImageDog);
    formData.append("upload_preset", "dog_tinder_users");
    console.log("formData", formData);
    setLoadingDog(true);

    Axios.post(
      "https://api.cloudinary.com/v1_1/dsag331qk/image/upload",
      formData
    ).then((response) => {
      setDisplayImageDog(response.data.secure_url);
      //   setLoading(false);
    });
  };

  const handleSubmitDog = (e, formValue) => {
    e.preventDefault();
    const imageURL = { image: displayImageDog };
    let merge = { ...formValue, ...imageURL };
    console.log(merge);
    const createDog = async () => {
      try {
        const res = await fetch("/dogs/" + currentUserDog._id, {
          method: "PUT",
          body: JSON.stringify(merge),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // props.updateProfile();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    createDog();
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="User Profile" {...a11yProps(0)} />
        <Tab label="Dog Profile" {...a11yProps(1)} />
        <Tab label="Account Settings" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Container maxWidth="lg">
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5">User Profile</Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmitUser}
            >
              {/* <Avatar alt='' src={currentUser.image}  className={classes.avatar}/>
                <div>
                <input
                  type="file"
                  name="file"
                  placeholder="Upload an image"
                  hidden
                  id="icon-button-file"
                />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <
                        
                        color="secondary"/>       
                    </IconButton>
                  </label>
                  </div> */}
              <div className="image-uploader">
                {!loadingUser ? (
                  // <CircularProgress />
                  <Avatar
                    alt=""
                    src={currentUser.image}
                    className={classes.avatar}
                  />
                ) : (
                  <Image
                    cloudName="dsag331qk"
                    style={{ height: "280px", width: "280px" }}
                    publicId={displayImageUser}
                  />
                )}
                <div>
                  <input
                    name="image"
                    type="file"
                    onChange={(e) => {
                      setUploadImageUser(e.target.files[0]);
                    }}
                    accept=".jpg,.jpeg,.gif,.png"
                  />
                </div>
                <button onClick={uploadUser} class="upload-image-btn">
                  Upload Image
                </button>
              </div>
              <TextField
                className={classes.field}
                label="Full Name"
                variant="outlined"
                defaultValue={currentUser.fullName || ""}
                placeholder={currentUser.fullName || ""}
                onChange={(e) =>
                  setChangeUserData({
                    ...changeUserData,
                    fullName: e.target.value,
                  })
                }
                fullWidth
              />{" "}
              <br />
              <TextField
                className={classes.field}
                label="Email"
                variant="outlined"
                defaultValue={currentUser.email || ""}
                placeholder={currentUser.email || ""}
                onChange={(e) =>
                  setChangeUserData({
                    ...changeUserData,
                    email: e.target.value,
                  })
                }
                fullWidth
              />
              <br />
              <TextField
                className={classes.field}
                label="Description"
                variant="outlined"
                defaultValue={currentUser.description || ""}
                placeholder={currentUser.description || ""}
                onChange={(e) =>
                  setChangeUserData({
                    ...changeUserData,
                    description: e.target.value,
                  })
                }
                fullWidth
                multiline
                rows={3}
              />
              <br />
              <br />
              <FormControl component="fieldset">
                <FormLabel className={classes.formlabel}>Location</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    className={classes.formControlLabel}
                    control={
                      <Checkbox
                        checked={state.checkedA}
                        onChange={handleChangeCheck}
                        name="checkedA"
                      />
                    }
                    label="North"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedB}
                        onChange={handleChangeCheck}
                        name="checkedB"
                      />
                    }
                    label="South"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedC}
                        onChange={handleChangeCheck}
                        name="checkedC"
                      />
                    }
                    label="East"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedD}
                        onChange={handleChangeCheck}
                        name="checkedD"
                      />
                    }
                    label="West"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedE}
                        onChange={handleChangeCheck}
                        name="checkedE"
                      />
                    }
                    label="Central"
                  />
                </FormGroup>
              </FormControl>
              <br />
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
          </Paper>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5">Dog Profile</Typography>

            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmitDog}
            >
              {/*   <Avatar alt='' src={currentUserDog.image} className={classes.avatar}/>
                <div>

                <input
                  type="file"
                  name="file"
                  placeholder="Upload an image"
                  hidden
                  id="icon-button-file"
                />
                <label htmlFor="icon-button-file">

                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera color="secondary"/>       
                    </IconButton>
                  </label>
                  </div> */}
              <div className="image-uploader">
                {!loadingDog ? (
                  // <CircularProgress />
                  <Avatar
                    alt=""
                    src={currentUserDog.image}
                    className={classes.avatar}
                  />
                ) : (
                  <Image
                    cloudName="dsag331qk"
                    style={{ height: "280px", width: "280px" }}
                    publicId={displayImageDog}
                  />
                )}
                <div>
                  <input
                    name="image"
                    type="file"
                    onChange={(e) => {
                      setUploadImageDog(e.target.files[0]);
                    }}
                    accept=".jpg,.jpeg,.gif,.png"
                  />
                </div>
                <button onClick={uploadDog} class="upload-image-btn">
                  Upload Image
                </button>
              </div>
              <TextField
                className={classes.field}
                label="Name"
                variant="outlined"
                defaultValue={currentUserDog.name || ""}
                placeholder={currentUserDog.name || ""}
                fullWidth
              />{" "}
              <br />
              <TextField
                className={classes.field}
                label="Year Of Birth"
                variant="outlined"
                defaultValue={currentUserDog.yob || ""}
                placeholder={currentUserDog.yob || ""}
                fullWidth
                type="number"
              />{" "}
              <br />
              <TextField
                className={classes.field}
                label="Breed"
                variant="outlined"
                defaultValue={currentUserDog.breed || ""}
                placeholder={currentUserDog.breed || ""}
                fullWidth
              />
              <br />
              <TextField
                className={classes.field}
                label="Description"
                variant="outlined"
                defaultValue={currentUserDog.description || ""}
                placeholder={currentUserDog.description || ""}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                className={classes.field}
                label="Owner"
                variant="outlined"
                defaultValue={currentUserDog.ownerUsername || ""}
                placeholder={currentUserDog.ownerUsername || ""}
                fullWidth
              />
              <br />
              <br />
              <FormControl component="fieldset">
                <FormLabel className={classes.formlabel}>Sex</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  value={currentUserDog.sex}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <br />
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
          </Paper>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5">Edit Password</Typography>
            <form className={classes.form} noValidate autoComplete="off">
              <br />
              <TextField
                className={classes.field}
                label="Password"
                type="password"
                variant="outlined"
                defaultValue={currentUser.password || ""}
                fullWidth
              />{" "}
              <br />
              <Button
                type="submit"
                className={classes.field}
                color="secondary"
                variant="contained"
                size="large"
              >
                Update
              </Button>
            </form>
          </Paper>
        </Container>
      </TabPanel>
    </div>
  );
}
