import NewSession from "../components/login/NewSession";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Footer from "../components/home/Footer";

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
              loggedInUserData={(userData) => props.loggedInUserData(userData)}
            />
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
