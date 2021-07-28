const mongoose = require("mongoose");

const likeEventSchema = mongoose.Schema({
  maleDog: { type: String, required: true },
  femaleDog: { type: String, required: true },
  maleToFemale: { type: Boolean, default: false },
  femaleToMale: { type: Boolean, default: false }
});

module.exports = mongoose.model("LikeEvent", likeEventSchema);
