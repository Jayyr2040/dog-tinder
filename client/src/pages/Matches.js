import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MatchRow from "../components/match/MatchRow";
import MatchDetails from "../components/match/MatchDetails";

export default function Matches(props) {
  const [matchedList, setMatchedList] = useState([]);
  const [selectedDogIndex, setSelectedDogIndex] = useState(-1);
  const [ownerDetails, setOwnerDetails] = useState();

  //-> useEffect here to fetch matched dogs
  useEffect(() => {
    console.log(`finding matches for ${props.currentUserDog._id}`);
    const fetchMatches = async () => {
      const res = await fetch("/matches", {
        method: "POST",
        body: JSON.stringify({ myDogID: props.currentUserDog._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("fetchMatches data", data);
      setMatchedList(data);
    };
    fetchMatches();
  }, []);

  const handleToggle = (inputIndex) => {
    const selectedDog = matchedList[inputIndex];
    console.log(`selected dog is ${selectedDog.name}`);
    setSelectedDogIndex(inputIndex);
    // -> async function to derive owner data
    const fetchOwnerDetails = async () => {
      const res = await fetch("/users/owner", {
        method: "POST",
        body: JSON.stringify({
          ownerUsername: matchedList[inputIndex].ownerUsername,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const ownerData = await res.json();
      setOwnerDetails(ownerData);
      console.log(ownerDetails);
    };
    fetchOwnerDetails();
  };

  const handleDelete = (inputIndex) => {
    console.log(`ID: ${matchedList[inputIndex]._id}`);
    const trashedList = matchedList.filter((_, i) => i !== inputIndex);
    setMatchedList(trashedList);
    //-> delete likeEvent in server too
    const deleteMatch = async () => {
      const res = await fetch("/likeevents", {
        method: "DELETE",
        body: JSON.stringify({
          myDogID: props.currentUserDog._id,
          otherDogID: matchedList[inputIndex]._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const deletedLikeEvent = await res.json();
      console.log(deletedLikeEvent);
    };
    deleteMatch();
  };

  const allMatches = matchedList.map((match, i) => (
    <MatchRow
      match={match}
      index={i}
      handleToggle={handleToggle}
      handleDelete={handleDelete}
    />
  ));

  return (
    <Container>
      <Box pt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={6}>
            {allMatches}
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            {selectedDogIndex >= 0 ? (
              <MatchDetails
                matchedList={matchedList}
                selectedDog={selectedDogIndex}
                ownerDetails={ownerDetails}
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
