const express = require("express");
const router = express.Router();
const LikeEvent = require("../models/likeEvents");

// INDEX
router.get("/", (req, res) => {
  LikeEvent.find({}, (err, foundLikeEvents) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundLikeEvents);
  });
});

// CREATE
router.post("/", (req, res) => {
  LikeEvent.create(req.body, (error, createdLikeEvents) => {
    console.log( req.body );
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdLikeEvents);
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  LikeEvent.findByIdAndRemove(req.params.id, (err, deletedEvent) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedEvent);
  });
});


// Matching likeEvent (not tested yet with sessions)
router.get("/:dogId", (req, res) => {

  // console.log("req.session.currentUser: " );
  // console.log( req.session.currentUser );

  const ownerId = "60fe823434ff591296b78d16";

  Dog.findOne(          
    {owner: ownerId},   // Identify who is owner
    (error, foundDog) => {

      const OWNER_DOG = (foundDog._id).toString() // Find the owner's dog id   
      const DOG_THAT_OWNER_LIKE = req.params.dogId;

      // find mutual like/ match
      LikeEvent.findOne( { $and: [ { liker: DOG_THAT_OWNER_LIKE }, { likee: OWNER_DOG} ] } , (err, foundMatch ) => {
        console.log("Found Match: ");
        console.log(foundMatch);
      });

    });
});




module.exports = router;
