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
    console.log("Owner name: ")
    console.log( req.body );

    let OWNERNAME = req.body.username;       

    // find owner's dog document (Assume User only have one dog)
    const results1 = () =>
    Dog.findOne({ownerUsername: OWNERNAME }, (error, ownerDog)=> { 
        console.log( ownerDog )
        return ownerDog;
    });

    // get id of owner's dogs 
    const results2A = (ownerDog) => {
        const find_params = {
            dogId : ownerDog._id,
            sex : ownerDog.sex,
        }
        console.log( find_params )
        return find_params;
    }

    // find likeEvent where other owners like owner's dogs
    const results2B = (find_params) => {
        if (find_params.sex === "Male") {
            return LikeEvent.find({maleDog: find_params.dogId, maleToFemale: true, femaleToMale: true}, (error, foundLikeEvents)=> {    
                return foundLikeEvents;
            })
        }

        if (find_params.sex === "Female") {
            return LikeEvent.find({femaleDog: find_params.dogId, maleToFemale: true, femaleToMale: true}, (error, foundLikeEvents)=> {    
                return foundLikeEvents;
            })
        }
    }

    results1()
        .then(results2A )
            .then( (findparams) => results2B(findparams) )
                .then(  (matchArray) =>{
                    console.log(matchArray);
                    res.send(matchArray);
                })
    
});









router.post("/old", (req, res) => {
    // console.log("Owner ID: ")
    // console.log( req.body );

    let matchArray = [];
    let OWNER_DOGS_IDS;

    // let OWNER_ID = req.session.currentUser._id;          // Matching likeEvent (not tested yet with sessions)
    let OWNER_ID = "60fe823434ff591296b78d16";              // hardcoded

    // find owner's dogs document
    const results1 = () =>
        Dog.find({owner: OWNER_ID }, (error, ownerDogs)=> { 
            return ownerDogs;
        });

    // get id of owner's dogs 
    const results2A = (ownerDogs) => {
        let ownerDogsIds = [];
        ownerDogs.forEach(element => ownerDogsIds.push( element._id ));
        OWNER_DOGS_IDS = ownerDogsIds;
        return ownerDogsIds;
    }

    // find likeEvent where other owners like owner's dogs
    const results2B = (ownerDogsIds) =>
        LikeEvent.find({likee: {$in: ownerDogsIds}}, (error, otherOwnerDogs)=> {    
            return otherOwnerDogs;
        })

    // get id of other owners's dog
    const results3A = (otherOwnerDogs) => {
        let otherOwnerDogsIds = [];
        otherOwnerDogs.forEach(element => otherOwnerDogsIds.push( element.liker ));
        return otherOwnerDogsIds;
    }

    // likeEvent matches = owner's dog also like these set of other owners's dog
    const results3B = (otherOwnerDogsIds) => 
        LikeEvent.find({ $and: [ { liker: {$in: OWNER_DOGS_IDS} }, {likee: {$in: otherOwnerDogsIds}} ]  }, (error, dogMatches)=> {    
            return dogMatches;
        })

    results1()
        .then(results2A )
            .then(results2B )
                .then(results3A )
                    .then(results3B )
                        .then(  (matchArray) =>{
                            console.log(matchArray);
                            res.send(matchArray);
                        })
    
});



router.post("/match", (req, res) => {
    LikeEvent.find({ likee: req.body.myDogID }, (err, dogAsLikeeEvents) => {
      const dogsThatLikeMyDog = dogAsLikeeEvents.map((event) => event.liker);
      LikeEvent.find(
        { liker: req.body.myDogID, likee: { $in: dogsThatLikeMyDog } },
        (err, dogAsLikerEvents) => {
          const dogsThatILikeToo = dogAsLikerEvents.map((event) => event.likee);
          Dog.find({ _id: { $in: dogsThatILikeToo } }, (err, matchedDogs) => {
            res.send(matchedDogs);
          });
        }
      );
    });
  });

module.exports = router;




