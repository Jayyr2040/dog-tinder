const mongoose = require("mongoose");

const likeEventSchema = mongoose.Schema({
  liker: { type: String, required: true },
  likee: { type: String, required: true },
});

module.exports = mongoose.model("LikeEvent", likeEventSchema);
