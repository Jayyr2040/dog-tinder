const express = require("express");
const router = express.Router();
const Dog = require("../models/dogs");
const LikeEvent = require("../models/likeEvents");
const User = require("../models/users");
/*
Algo.
Step 1: Find Users who live in x location
Step 2: Find Dogs whose users live in x location
Step 3: Find Dogs whose sex is opposite of user's dog
Step 4: Find Dogs whose breed is same as user's dog
*/

// Browse
router.post("/", (req, res) => {
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

module.exports = router;
