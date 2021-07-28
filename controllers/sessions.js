const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Dog = require("../models/dogs");

// login
router.post("/", (req, res) => {
  console.log("test response", req.body);
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send("oops the db had a problem");
    } else if (!foundUser) {
      res.send('<a  href="/">Sorry, no user found </a>');
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      Dog.findOne({ ownerUsername: req.body.username }, (err, foundDog) => {
        req.session.currentUser = foundUser;
        req.session.currentDog = foundDog;
        console.log("log in user", req.session.currentUser);
        res.send(req.session);
      });
    } else {
      res.send('<a href="/"> password does not match </a>');
    }
  });
});

// check login
router.get("/check", (req, res) => {
  if (req.session === undefined) {
    res.send("not logged in");
  } else {
    res.send(req.session);
  }
});

// logout
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.send("user has logged out");
  });
});

// EXPORT
module.exports = router;
