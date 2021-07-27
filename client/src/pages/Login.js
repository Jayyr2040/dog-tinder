import NewSessions from "../components/NewSessions";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

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
}));

function Login(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}></Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper className={classes.root} elevation={2}>
            <NewSessions
              loggedInUserData={(userData) => props.loggedInUserData(userData)}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
