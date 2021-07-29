import React, { useState, useEffect } from "react";
import ShowDog from "../components/browse/ShowDog";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ClearIcon from "@material-ui/icons/Clear";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fab: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    background: "white",
    elevation: 1,
  },
}));

let dogCounter = 0;

export default function Browse(props) {
  const classes = useStyles();
  const [dogSuggestions, setDogSuggestions] = useState([]);
  const [currentDog, setCurrentDog] = useState();

  let loggedInDogID = props.currentUserDog?._id;

  const postSuggestionsReq = {
    loggedInDogID: props.currentUserDog?._id,
    userLocation: props.currentUser?.location,
    dogBreed: props.currentUserDog?.breed,
    dogSex: props.currentUserDog?.sex === "Male" ? "Female" : "Male",

    loggedInDogID: loggedInDogID,
  };

  useEffect(() => {
    console.log(postSuggestionsReq);
    const fetchDogs = async () => {
      const res = await fetch("/browse/test", {
        method: "POST",
        body: JSON.stringify(postSuggestionsReq),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setDogSuggestions(data);
      setCurrentDog(data[dogCounter]);
    };
    fetchDogs();
  }, []);

  const chooseDislike = () => {
    console.log(`Ew, no.`);
    dogCounter === dogSuggestions.length - 1
      ? (dogCounter = 0)
      : (dogCounter += 1);
    setCurrentDog(dogSuggestions[dogCounter < 1 ? 0 : dogCounter]);
  };

  const chooseLike = (likedDog) => {
    console.log(`Love ${likedDog.name}!`);
    setDogSuggestions(dogSuggestions.splice(dogCounter, 1));
    console.log(dogSuggestions);
    // dogCounter === dogSuggestions.length ? (dogCounter = 0) : (dogCounter += 1);
    setCurrentDog(dogSuggestions[0]);
    const likeDog = async () => {
      const res = await fetch("/likeevents", {
        method: "POST",
        body: JSON.stringify({ liker: loggedInDogID, likee: likedDog._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    };
    likeDog();
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item md={12}>
          <Fade in={true} timeout={1000} style={{ transitionDelay: "500ms" }}>
            <ShowDog
              currentDog={currentDog}
              chooseDislike={chooseDislike}
              chooseLike={chooseLike}
            />
          </Fade>
        </Grid>
        <Grid item md={12}>
          <Fab
            color="inherit"
            aria-label="dislike"
            className={classes.fab}
            onClick={() => chooseDislike()}
          >
            <ClearIcon color="secondary" style={{ fontSize: 30 }} />
          </Fab>
          <Fab
            color="inherit"
            aria-label="like"
            className={classes.fab}
            onClick={() => chooseLike(currentDog)}
          >
            <FavoriteIcon color="primary" style={{ fontSize: 25 }} />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}
