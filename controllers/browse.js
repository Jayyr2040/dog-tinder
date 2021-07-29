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

<<<<<<< HEAD


function checkAdult(age) {
  return age >= 18;
}



router.post("/test2", (req, res) => {
=======
// New Test
router.post("/", (req, res) => {
>>>>>>> 1abf541603aecf3088748d65b90b306185745588
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
<<<<<<< HEAD
            res.status(200).json(suggestions.length);
=======
            res.status(200).json(suggestions);
>>>>>>> 1abf541603aecf3088748d65b90b306185745588
          }
        );
      }
    );
  });
});

<<<<<<< HEAD


router.get("/", (req, res) => {
  res.send("browse route GET")
})

router.post("/test", (req, res) => {

  User.find({ location: { $in: req.body.userLocation } }, (err, foundUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    const ownerUsernames = foundUsers.map((user) => user.username);

    LikeEvent.find( {liker: req.body.loggedInDogID } , (err, foundLikeEvents) => {   // assume loggedInDogID can be in POST request
        // const dogsMyDogLike = foundLikeEvents.map((likeEvent) => mongoose.Types.ObjectId(likeEvent.likee));
        const dogsMyDogLike = foundLikeEvents.map((likeEvent) => likeEvent.likee);
        console.log( dogsMyDogLike );

        Dog.find(
        {
            $and: [
            { breed: req.body.dogBreed },
            { sex: req.body.dogSex },
            { ownerUsername: { $in: ownerUsernames } },
            // { _id: { $nin: dogsMyDogLike }  },
            ],
        },
        (err, foundDogs) => {
            if (err) {
            res.status(400).json({ error: err.message });
            }

            // const result = words.filter(word => word.length > 6);
            // res = arr1.filter(item => !arr2.includes(item));
            console.log( "============" );
            console.log( "============" );
            console.log( foundDogs[0]._id )
            const test1 = foundDogs[0]._id;
            const test2 = dogsMyDogLike[0];
            // const test3 = mongoose.Types.ObjectId((test2) )
            console.log( typeof test1 )
            console.log( typeof test2 )
            console.log(  test1 )
            console.log(  test2 )
            console.log( test1.equals( test2)  )
            // const result = foundDogs.filter(item => !dogsMyDogLike.includes( item._id) );
            const result = foundDogs.filter(item => !dogsMyDogLike.includes( item._id) );
            // console.log("foundDogs:");
            // console.log( foundDogs.slice(0,3) );
            console.log("result:");
            console.log( result.slice(0,3) );

            res.status(200).json(foundDogs);
        });

      });
    });

     
});



=======
>>>>>>> 1abf541603aecf3088748d65b90b306185745588
module.exports = router;



// soonhuat's dog Gigi: 610106b09250414e2c6279c9
// Goober: 610106b09250414e2c6279ce
// Peanut: 610106b09250414e2c6279d4
