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
router.delete("/", (req, res) => {
  LikeEvent.findOneAndRemove(
    { liker: req.body.myDogID, likee: req.body.otherDogID },
    (err, deletedEvent) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(deletedEvent);
    }
  );
});



module.exports = router;
