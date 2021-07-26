//=================
// Dependencies
//=================
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;
//=================
// Config - Express
//=================
const app = express();

//==================
// Config - Mongoose
//==================
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

//====================
// Config - Controller
//====================
app.get("/", (req, res) => {
  res.send("test");
});

app.listen(PORT, () => {
  console.log("Dog matching happening on port", PORT);
});
