const express = require("express");
const router = express.Router();
const Dog = require("../models/dogs");
const seedDogs = require("../utils/seedDogs");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// SEED
router.get("/seed", (req, res) => {
  Dog.create(seedDogs, (err, data) => {
    res.redirect("/dogs");
  });
});

// INDEX
router.get("/", async (req, res) => {
  try {
    let dog = await Dog.find();
    res.json(dog);
  } catch (error) {
    console.log(error);
  }
  // Dog.find({}, (err, foundDogs) => {
  //   if (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  //   res.status(200).json(foundDogs);
  // });
});

// NEW
router.get("/new", (req, res) => {
  res.send("Dogs");
});

// CREATE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    res.json(result)

    let dog = new Dog({
      name: req.body.name,
      image: result.secure.url,
      sex: req.body.sex,
      yob: req.body.yob,
      breed: req.body.breed,
      description: req.body.description,
      owner: req.body.owner,
    })

    await dog.save();
    res.json(dog)
  } catch (error) {
    console.log(error)
  }
  // Dog.create(req.body, (error, createdDog) => {
  //   if (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  //   res.status(200).send(createdDog);
  // });
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
