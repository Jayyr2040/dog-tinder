import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core/";
import { Paper } from "@material-ui/core/";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    paper: {
      margin: theme.spacing(1),
      padding: 40,
      maxWidth: '100%',
    
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
      marginLeft: 'auto',
      marginRight: 'auto'
  
    },
    formlabel:{
      fontSize:12,
    }
  }));
  
  export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    // checkboxes
    const [state, setState] = React.useState({
      checkedA: false,
      checkedB: false,
      checkedC: false,
      checkedD: false,
      checkedE: true,
     
    });
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    // checkboxes
    const handleChangeCheck = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

///// radio buttons
    const [value1, setValue1] = React.useState('female');

  const handleChangeRadio = (event) => {
    setValue1(event.target.value);
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
          <Tab label="Log Out" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
  
        <Container maxWidth="lg">
          <Paper elevation={5} className={classes.paper}>
            <Typography variant="h5">User Profile</Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
            >
                <Avatar alt="Julia Jordan" src="https://res.cloudinary.com/dsag331qk/image/upload/v1627457852/dogtinder/users/ftsl1kdbzcypotdwz2gd.jpg"  className={classes.avatar}/>
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
                        <PhotoCamera  color="secondary"/>       
                    </IconButton>
                  </label>
                  </div>
              <TextField
                className={classes.field}
                label="Username"
                variant="outlined"
                defaultValue = {props.value || 'juliajordan'}
                placeholder={props.value || 'juliajordan'}
                fullWidth
              />{" "}
              <br />
              <TextField
                className={classes.field}
                label="Full Name"
                variant="outlined"
                defaultValue = {props.value || 'Julia Jordan'}
                placeholder={props.value || 'Julia Jordan'}
                fullWidth
              />{" "}
              <br />
              <TextField
                className={classes.field}
                label="Email"
                variant="outlined"
                defaultValue = {props.value || 'juliajordan@yahoo.com.sg'}
                placeholder= {props.value || 'juliajordan@yahoo.com.sg'}
                fullWidth
              />
              <br />
      {/*         <TextField
                className={classes.field}
                label="Location"
                variant="outlined"
                defaultValue = {props.value || 'Central'}
                placeholder={props.value || 'Central'}
                fullWidth
              /> */}
              <TextField
                className={classes.field}
                label="Description"
                variant="outlined"
                defaultValue = {props.value || "I am the owner of Jaco who has been my buddy since 2018. My hobbies are working out and bringing Jaco out to his favourite park to play."}
                placeholder={props.value || "I am the owner of Jaco who has been my buddy since 2018. My hobbies are working out and bringing Jaco out to his favourite park to play."}
                fullWidth
                multiline
                rows={3}
              />
                <br />
                <br />
              <FormControl component="fieldset">
              <FormLabel className={classes.formlabel}>Location</FormLabel>
              <FormGroup row >
                  <FormControlLabel className={classes.formControlLabel}
                  control={<Checkbox checked={state.checkedA} onChange={handleChangeCheck} name="checkedA" />}
                  label="North" />
                  <FormControlLabel
                  control={<Checkbox checked={state.checkedB} onChange={handleChangeCheck} name="checkedB" />}
                  label="South" />
                  <FormControlLabel
                  control={<Checkbox checked={state.checkedC} onChange={handleChangeCheck} name="checkedC" />}
                  label="East" />
                  <FormControlLabel
                  control={<Checkbox checked={state.checkedD} onChange={handleChangeCheck} name="checkedD" />}
                  label="West" />
                  <FormControlLabel
                  control={<Checkbox checked={state.checkedE} onChange={handleChangeCheck} name="checkedE" />}
                  label="Central" />
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
            >
                <Avatar alt="Jaco" src="https://i.ibb.co/QKL2Kc8/Jaco.jpg"  className={classes.avatar}/>
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
                  </div>
              <TextField
                className={classes.field}
                label="Name"
                variant="outlined"
                defaultValue = {props.value || 'Jaco'}
                placeholder={props.value || 'Jaco'}
                fullWidth
              />{" "}
              <br />
             {/*  <TextField
                className={classes.field}
                label="Sex"
                variant="outlined"
                defaultValue = {props.value || 'Female'}
                placeholder={props.value || 'Female'}
                fullWidth
              />{" "} */}
              <TextField
                className={classes.field}
                label="Year Of Birth"
                variant="outlined"
                defaultValue = {props.value || '2016'}
                placeholder={props.value || '2016'}
                fullWidth
                type="number"
              />{" "}
              <br />
              <TextField
                className={classes.field}
                label="Breed"
                variant="outlined"
                defaultValue = {props.value || 'Pomeranian'}
                placeholder={props.value || 'Pomeranian'}
                fullWidth
              />
              <br />
              <TextField
                className={classes.field}
                label="Description"
                variant="outlined"
                defaultValue = {props.value || 'This calm dog is mean to his owner, but will sometimes come when called. He generally has a mild interest in strangers, and does not mind other animals.'}
                placeholder={props.value || 'This calm dog is mean to his owner, but will sometimes come when called. He generally has a mild interest in strangers, and does not mind other animals.'}
                fullWidth
                multiline
                rows={3}
              />
                 <TextField
                className={classes.field}
                label="Owner"
                variant="outlined"
                defaultValue = {props.value || 'juliajordan'}
                placeholder={props.value || 'juliajordan'}
                fullWidth
              />
                     <br />
                     <br />
                <FormControl component="fieldset">
                  <FormLabel className={classes.formlabel}>Sex</FormLabel>
                  <RadioGroup row aria-label="gender" name="gender1" value={value1} onChange={handleChangeRadio}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
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
            <Typography variant="h5">Edit Account Settings</Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <TextField
                className={classes.field}
                label="User Name"
                variant="outlined"
                defaultValue = {props.value || 'juliajordan'}
                placeholder={props.value || 'juliajordan'}
                fullWidth
              />{" "}
              <br />
              <TextField
                className={classes.field}
                label="Password"
                type="password"
                variant="outlined"
                defaultValue = {props.value || '12345'}
                placeholder={props.value || '12345'}
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
        <TabPanel value={value} index={3}>
        <p>
          Log Out
          </p>
        </TabPanel>
      </div>
    );
  }