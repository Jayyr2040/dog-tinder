import React, { useState, useEffect } from "react";
import ShowDog from "../components/browse/ShowDog";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ClearIcon from "@material-ui/icons/Clear";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Box } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

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
  };

  useEffect(() => {
    console.log(postSuggestionsReq);
    const fetchDogs = async () => {
      const res = await fetch("/browse", {
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
    // eslint-disable-next-line
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
    const updatedSuggestions = dogSuggestions.filter(
      (dog) => dog._id !== likedDog._id
    );
    console.log(updatedSuggestions);
    setDogSuggestions(updatedSuggestions);
    dogCounter === 0 ? (dogCounter = 1) : (dogCounter = 0);
    setCurrentDog(dogSuggestions[dogCounter]);
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
          {dogSuggestions.length > 0 ? (
            <ShowDog
              currentDog={currentDog}
              chooseDislike={chooseDislike}
              chooseLike={chooseLike}
            />
          ) : (
            <div>
              <Typography align="center">
                Looks like you've liked all the dogs in your area.
              </Typography>
              <br />
              <Box display="flex" justifyContent="center">
                <RouterLink to="/matches" style={{ textDecoration: "none" }}>
                  <Button color="secondary" variant="contained">
                    See matches
                  </Button>
                </RouterLink>
              </Box>
            </div>
          )}
        </Grid>
        <Grid item md={12}>
          {dogSuggestions.length > 0 && (
            <div>
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
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
