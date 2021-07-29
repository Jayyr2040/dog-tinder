import NewSession from "../components/login/NewSession";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Footer from "../components/home/Footer";
import { Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    paddingTop: "30px",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(80),
      height: theme.spacing(45),
    },
  },
  footer: {
    textAlign: "center",
    marginTop: theme.spacing(6),
  },
  signup: {
    marginTop: theme.spacing(1),
    textAlign: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function Login(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper className={classes.root} elevation={2}>
            <NewSession
              loggedInUserData={(fullData) => props.loggedInUserData(fullData)}
              // loggedInDogData={(dogData) => props.loggedInDogData(dogData)}
            />
          </Paper>
          <Paper className={classes.signup} elevation={2}>
            <Typography variant="subtitle2">
              New to Dog Tinder?{" "}
              <RouterLink
                to="/register"
                style={{ textDecoration: "none", color: "#d4524d" }}
              >
                Sign up!
              </RouterLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
