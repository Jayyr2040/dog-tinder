const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const seedUsers = require("../utils/seedUsers");

// SEED
router.get("/seed", (req, res) => {
  seedUsers.forEach(
    (user) =>
      (user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)))
  );
  User.create(seedUsers, (err, data) => {
    res.redirect("/users");
  });
});

// INDEX
router.get("/", (req, res) => {
  User.find({}, (err, foundUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundUsers);
  });
});

// NEW
router.get("/new", (req, res) => {
  res.send("send this to CRA");
});

// CREATE
router.post("/", (req, res) => {
  console.log(req.body);
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdUser);
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedUser);
    }
  );
});

// SHOW
router.get("/:id", (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    console.log(foundUser);
    res.send(foundUser);
  });
});

module.exports = router;
