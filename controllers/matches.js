const express = require("express");
const router = express.Router();
const Dog = require("../models/dogs");
const LikeEvent = require("../models/likeEvents");

/*
Algo.
Step 1: Find dogs like that my dog -> list A
Step 2: Within list A, find dogs that my dog likes -> List B
Step 3: Within list B, find the dogs' details
*/

// Matches
router.post("/", (req, res) => {
  LikeEvent.find({ likee: req.body.myDogID }, (err, dogAsLikeeEvents) => {
    const dogsThatLikeMyDog = dogAsLikeeEvents.map((event) => event.liker);
    LikeEvent.find(
      { liker: req.body.myDogID, likee: { $in: dogsThatLikeMyDog } },
      (err, dogAsLikerEvents) => {
        const dogsThatILikeToo = dogAsLikerEvents.map((event) => event.likee);
        Dog.find({ _id: { $in: dogsThatILikeToo } }, (err, matchedDogs) => {
          res.send(matchedDogs);
        });
      }
    );
  });
});

module.exports = router;
