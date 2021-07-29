const express = require("express");
const router = express.Router();
const Dog = require("../models/dogs");
const LikeEvent = require("../models/likeEvents");
const User = require("../models/users");
const mongoose = require("mongoose");
/*
Algo.
Step 1: Find Users who live in x location
Step 2: Find Dogs whose users live in x location
Step 3: Find Dogs whose sex is opposite of user's dog
Step 4: Find Dogs whose breed is same as user's dog
*/

const alreadyLiked = [
  "6100f6f946ef971451c9a05c",
  "6100f6f946ef971451c9a069",
  "6100f6f946ef971451c9a06b",
];

const allSuggestions = [
  "6100f6f946ef971451c9a05c",
  "6100f6f946ef971451c9a069",
  "6100f6f946ef971451c9a06b",
  "6100f6f946ef971451c9a071",
  "6100f6f946ef971451c9a072",
  "6100f6f946ef971451c9a073",
  "6100f6f946ef971451c9a074",
  "6100f6f946ef971451c9a064",
  "6100f6f946ef971451c9a05d",
  "6100f6f946ef971451c9a05f",
  "6100f6f946ef971451c9a061",
];

const answer = allSuggestions.filter((el) => !alreadyLiked.includes(el));
console.log(answer.length);

const filterDogs = (allSuggestions, alreadyLiked) => {
  allSuggestions.filter((el) => !alreadyLiked.includes(el));
};

// Browse
router.post("/archive", (req, res) => {
  User.find({ location: { $in: req.body.userLocation } }, (err, foundUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    const ownerUsernames = foundUsers.map((user) => user.username);
    Dog.find(
      {
        $and: [
          { breed: req.body.dogBreed },
          { sex: req.body.dogSex },
          { ownerUsername: { $in: ownerUsernames } },
        ],
      },
      (err, foundDogs) => {
        if (err) {
          res.status(400).json({ error: err.message });
        }
        res.status(200).json(foundDogs);
      }
    );
  });
});

// New Test
router.post("/", (req, res) => {
  User.find({ location: { $in: req.body.userLocation } }, (err, foundUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    const ownerUsernames = foundUsers.map((user) => user.username);
    LikeEvent.find(
      { liker: req.body.loggedInDogID },
      (err, foundLikeEvents) => {
        const dogsMyDogLike = foundLikeEvents.map(
          (likeEvent) => likeEvent.likee
        );
        Dog.find(
          {
            $and: [
              { breed: req.body.dogBreed },
              { sex: req.body.dogSex },
              { ownerUsername: { $in: ownerUsernames } },
              { _id: { $nin: dogsMyDogLike } },
            ],
          },
          (err, suggestions) => {
            if (err) {
              res.status(400).json({ error: err.message });
            }
            res.status(200).json(suggestions);
          }
        );
      }
    );
  });
});

module.exports = router;



// soonhuat's dog Gigi: 610106b09250414e2c6279c9
// Goober: 610106b09250414e2c6279ce
// Peanut: 610106b09250414e2c6279d4
