import { MenuItem, Select } from "@material-ui/core";
import { Paper } from "@material-ui/core/";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import { Image } from "cloudinary-react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";
import Button from "../register/FormsUI/Button";
import Textfield from "../register/FormsUI/Textfield";


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

const USER_FORM_VALIDATION = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  location: Yup.array(),
});

const DOG_FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  breed: Yup.string(),
  sex: Yup.string().required("Required"),
  yob: Yup.number().min(2010).max(2019),
  description: Yup.string(),
});

const ACCOUNT_FORM_VALIDATION = Yup.object().shape({
  password: Yup.string().required("Required"),
});

export default function AccountSettings(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log("settings - currentUser", props?.currentUser);
  console.log("settings - currentDog", props?.currentUserDog);
  const currentUser = props?.currentUser;
  const currentUserDog = props?.currentUserDog;

  const INITIAL_USER_FORM_STATE = {
    fullName: currentUser.fullName,
    description: currentUser.description,
    location: currentUser.location,
  };

  const INITIAL_DOG_FORM_STATE = {
    name: currentUserDog.name,
    breed: currentUserDog.breed,
    sex: currentUserDog.sex,
    yob: currentUserDog.yob,
    description: currentUserDog.description,
  };

  const INITIAL_ACCOUNT_FORM_STATE = {
    password: ''
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Upload Userimage
  const [displayImageUser, setDisplayImageUser] = React.useState(
    currentUser.image
  );
  const [uploadImageUser, setUploadImageUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const uploadUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", uploadImageUser);
    formData.append("upload_preset", "dog_tinder_users");
    console.log("formData", formData);
    setLoading(true);

    Axios.post(
      "https://api.cloudinary.com/v1_1/dsag331qk/image/upload",
      formData
    ).then((response) => {
      setDisplayImageUser(response.data.secure_url);
      setLoading(false);
    });
  };

  const handleSubmitUser = (formValue) => {
    const userImageURL = { image: displayImageUser };
    let merge = { ...formValue, ...userImageURL };
    console.log(merge);
    const createNewAccount = async () => {
      try {
        const res = await fetch(
          "/users/" + currentUser._id,
          {
            method: "PUT",
            body: JSON.stringify(merge),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        alert("User profile updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    createNewAccount();
  };

  // Upload Dogimage
  const [displayImageDog, setDisplayImageDog] = React.useState(
    currentUserDog.image
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
      setLoadingDog(false);
    });
  };

  const handleSubmitDog = (formValue) => {
    const imageURL = { image: displayImageDog };
    let merge = { ...formValue, ...imageURL };
    console.log(merge);
    const createDog = async () => {
      try {
        const res = await fetch(
          "/dogs/" + currentUserDog._id,
          {
            method: "PUT",
            body: JSON.stringify(merge),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        alert("Dog profile updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    createDog();
  };

  const handleSubmitPassword = (formValue) => {
    const createPassword = async () => {
      try {
        const res = await fetch(
          "/users/" + currentUser._id,
          {
            method: "PUT",
            body: JSON.stringify(formValue),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        alert("Password updated succesfully!");
      } catch (error) {
        console.log(error);
      }
    };
    createPassword();
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
            <Typography variant="h5" gutterBottom>User Profile</Typography>
            <div className="image-uploader">
              {loading ? (
                <CircularProgress />
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
            <Formik
              initialValues={{
                ...INITIAL_USER_FORM_STATE,
              }}
              validationSchema={USER_FORM_VALIDATION}
              onSubmit={handleSubmitUser}
            >
              <Form>
                <Textfield
                  name="fullName"
                  label="Full Name"
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
                    Preferred Location(s):
                  </Typography>
                  <div className="checkboxes-row-1">
                    <label>
                      <Field
                        name="location"
                        type="checkbox"
                        placeholder="North"
                        value="North"
                        as={Checkbox}
                      />
                      North
                    </label>
                    <label>
                      <Field
                        name="location"
                        type="checkbox"
                        placeholder="South"
                        value="South"
                        as={Checkbox}
                      />
                      South
                    </label>
                    <label>
                      <Field
                        name="location"
                        type="checkbox"
                        placeholder="East"
                        value="East"
                        as={Checkbox}
                      />
                      East
                    </label>
                  </div>
                  <div className="checkboxes-row-2">
                    <label>
                      <Field
                        name="location"
                        type="checkbox"
                        placeholder="West"
                        value="West"
                        as={Checkbox}
                      />
                      West
                    </label>
                    <label>
                      <Field
                        name="location"
                        type="checkbox"
                        placeholder="Central"
                        value="Central"
                        as={Checkbox}
                      />
                      Central
                    </label>
                  </div>
                </div>
                <Button>Update</Button>
              </Form>
            </Formik>
            <br />
          </Paper>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" gutterBottom>Dog Profile</Typography>
               <div className="image-uploader">
                {loadingDog ? (
                  <CircularProgress />
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
              </div>
              <div className="image-uploader">
                <button onClick={uploadDog} class="upload-image-btn">
                  Upload Image
                </button>
              </div>
            <Formik
              initialValues={{
                ...INITIAL_DOG_FORM_STATE,
              }}
              validationSchema={DOG_FORM_VALIDATION}
              onSubmit={handleSubmitDog}
            >
              <Form>
                <Textfield name="name" label="Name" className={classes.field} />
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
                    <Field name="sex" type="radio" value="Female" as={Radio} />
                    Female
                  </label>
                </div>
                <Button>Update</Button>
              </Form>
            </Formik>
          </Paper>
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container>
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5" gutterBottom>Edit Password</Typography>

             <Formik
                initialValues={{
                  ...INITIAL_ACCOUNT_FORM_STATE,
                }}
                validationSchema={ACCOUNT_FORM_VALIDATION}
                onSubmit={handleSubmitPassword}
              >
                <Form>
                  <Textfield
                    name="password"
                    label="Password"
                    type='password'
                    className={classes.field}
                  />
                  <Button>Update password</Button>
                </Form>
              </Formik>
          </Paper>
        </Container>
      </TabPanel>
    </div>
  );
}
