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
  //-> useEffect here to fetch matched dogs
  const [matchedList, setMatchedList] = useState(tempDogData);

  const allMatches = matchedList.map((match, i) => (
    <MatchRow match={match} index={i} />
  ));

  return (
    <Container>
      <Box pt={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} md={5}>
            {allMatches}
          </Grid>
          <Grid item xs={12} sm={7} md={7}>
            <MatchDetails />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
