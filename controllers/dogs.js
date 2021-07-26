const express = require("express");
const router = express.Router();
const Dog = require("../models/dogs");
const seedDogs = require("../utils/seedDogs");

// SEED
router.get("/seed", (req, res) => {
  Dog.create(seedDogs, (err, data) => {
    res.redirect("/dogs");
  });
});

// INDEX
router.get("/", (req, res) => {
  Dog.find({}, (err, foundDogs) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundDogs);
  });
});

// NEW
router.get("/new", (req, res) => {
  res.send("Dogs");
});

// CREATE
router.post("/", (req, res) => {
  Dog.create(req.body, (error, createdDog) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdDog);
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  Dog.findByIdAndRemove(req.params.id, (err, deletedDog) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedDog);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  Dog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedDog) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedDog);
    }
  );
});

// SHOW
router.get("/:id", (req, res) => {
  Dog.findById(req.params.id, (error, foundDogs) => {
    console.log(foundDogs);
    res.send(foundDogs);
  });
});

module.exports = router;
