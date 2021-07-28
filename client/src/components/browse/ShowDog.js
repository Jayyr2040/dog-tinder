import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(80),
      height: theme.spacing(42),
    },
  },
  grid: {
    padding: theme.spacing(3),
  },
}));

export default function ShowDog(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <img src={props.currentDog?.image} alt="dog" />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5" style={{ fontWeight: 700 }}>
              {props.currentDog?.name},{" "}
              {new Date().getFullYear() - props.currentDog?.yob}
            </Typography>
            <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
              {props.currentDog?.breed}{" "}
              {props.currentDog?.sex === "F" ? "♀" : "♂"}
            </Typography>
            <br />
            <Typography variant="body2">
              {props.currentDog?.description}
            </Typography>
            <p />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
