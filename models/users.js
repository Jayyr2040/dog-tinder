const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accountType: {
    type: String,
    required: true,
    default: "user",
    enum: {
      values: ["user", "admin"],
      message: "{VALUE} is not recognised",
    },
  },
  fullName: { type: String, required: true },
  image: String,
  email: { type: String, required: true },
  location: {
    type: [String],
    default: ["North", "South", "East", "West", "Central"],
  },
  description: String,
});

module.exports = mongoose.model("User", userSchema);
