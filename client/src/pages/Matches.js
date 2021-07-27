import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MatchRow from "../components/match/MatchRow";
import MatchDetails from "../components/match/MatchDetails";

const tempDogData = [
  {
    name: "Aloha",
    breed: "Pomeranian",
    image: "https://i.ibb.co/2h7ckgg/test2.jpg",
    sex: "Male",
    yob: 2014,
    description:
      "Aloha is loving towards owner and is smart. He knows many basic commands and tricks.",
    ownerUsername: "",
  },
  {
    name: "Beast",
    breed: "Dachshund",
    image: "https://i.ibb.co/wsB9h9L/das1.png",
    sex: "Female",
    yob: 2015,
    description:
      "Beast is crafty and calm. She is very clean. She is very playful. But she will not eat any food she is given. Her favourite dog food brand is CESAR.",
    ownerUsername: "",
  },
  {
    name: "Cheeky",
    breed: "Pomeranian",
    image: "https://i.ibb.co/RSCspV7/pom1.jpg",
    sex: "Male",
    yob: 2016,
    description:
      "Cheeky LOVES to roll in mud. He is playful He likes to talk at people. He will eat any food he gets access to. His favourite dog food brand Pedigree.",
    ownerUsername: "",
  },
];

export default function Matches() {
  const [matchedList, setMatchedList] = useState(tempDogData);
  const [selectedDogIndex, setSelectedDogIndex] = useState(-1);
  // const [ownerDetails, setOwnerDetails] = useState()

  //-> useEffect here to fetch matched dogs

  const handleToggle = (inputIndex) => {
    const selectedDog = matchedList[inputIndex];
    console.log(`selected dog is ${selectedDog.name}`);
    setSelectedDogIndex(inputIndex);
    // -> async function to derive owner data, need to create new state
    // const fetchOwnerDetails = async () => {
    //   const res = await fetch("unique route to fetch owner data")
    //   const ownerData = await res.json()
    //   console.log(ownerData)
    //   setOwnerDetails(ownerData)
    // }
    // fetchOwnerDetails()
  };

  const handleDelete = (inputIndex) => {
    console.log(`${inputIndex} to be deleted`);
    const trashedList = matchedList.filter((_, i) => i !== inputIndex);
    setMatchedList(trashedList);
    // -> async function to delete likeEvent, LikeEvent.delete({two dogs' id})
    // const deleteMatch = async () => {
    //   const res = await fetch("unique route to delete likeEvent")
    //   const deletedLikeEvent = await res.json()
    //   console.log(deletedLikeEvent)
    // }
    // deleteMatch()
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
                // ownerDetails={ownerDetails}
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
