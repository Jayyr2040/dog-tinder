const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Dog = require("../models/dogs");

// ROUTES
// get new user index
router.get("/new", (req, res) => {
    res.send("send this to CRA");
   });

router.post("/", (req, res) => {
    User.findOne({username: req.body.username},(err,foundUser) => {
        if (err) {
            console.log(err);
            res.send("oops the db had a problem");      
          } else if (!foundUser) {
            res.send('<a  href="/">Sorry, no user found </a>');
          } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            console.log("log in user", req.session.currentUser);
            Dog.findOne(
              {owner: req.session.currentUser._id},
              (error, foundDogs) => {
                console.log("found dog", foundDogs);
              req.session.dog = foundDogs;
            });
            res.send(req.session);
            } else {
                res.send('<a href="/"> password does not match </a>');
              }
          })
   });

   // logout
   router.delete("/", (req, res) => {
    console.log("log out user", req.session.currentUser);
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
  

// EXPORT
module.exports = router;
