const express = require("express");
const router = express.Router();
const LikeEvent = require("../models/likeEvents");
const User = require("../models/users");
const Dog = require("../models/dogs");


// INDEX
router.get("/", (req, res) => {
    res.send('likeEventsMatch INDEX');
});


// return likeEvent matches
router.post("/", (req, res) => {
    // console.log("Owner ID: ")
    // console.log( req.body );

    let matchArray = [];
    let OWNER_DOG_ID;
    let dogsThatUserDogLikes;

    // let OWNER_ID = req.session.currentUser._id;          // Matching likeEvent (not tested yet with sessions)
    let OWNER_ID = "60fe823434ff591296b78d16";              // hardcoded

    // find owner's dogs document
    const results1 = () =>
        Dog.find({owner: OWNER_ID }, (error, ownerDogs)=> { 
            return ownerDogs;
        });

    // get id of owner's dogs 
    const results2A = (ownerDogs) => {
        let dogsIdArray = [];
        ownerDogs.forEach(element => dogsIdArray.push( element._id ));
        return dogsIdArray;
    }

    // find likeEvent where other owners like owner's dogs
    const results2B = (dogsIdArray) =>
        LikeEvent.find({likee: {$in: dogsIdArray}}, (error, dogMatches)=> {    
            return dogMatches;
        })

    results1()
        .then(results2A )
            .then(results2B )
                .then(  (matchArray) =>{
                    console.log(matchArray);
                    res.send(matchArray);
                })

});


module.exports = router;
