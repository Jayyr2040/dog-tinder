const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

// Validate username
router.post("/validUsername", (req, res) => {
  console.log("Request: ", req.body);
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        console.log({ msg: "Username already been taken" });
        return res.json({ msg: "Username already been taken" });
      }

      console.log({ msg: "Username available." });
      return res.json({ msg: "Username available." });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json("Error: " + err);
    });
});

// Validate email
router.post("/validEmail", (req, res) => {
  console.log("Request: ", req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log({ msg: "Email address is in use." });
        return res.json({ msg: "Email address is in use." });
      }

      console.log({ msg: "Email address is available." });
      return res.json({ msg: "Email address is available." });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json("Error: " + err);
    });
});

// EXPORT
module.exports = router;
