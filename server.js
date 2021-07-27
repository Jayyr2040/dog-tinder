//=================
// Dependencies
//=================
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;
const cors = require("cors");
const session = require("express-session");

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

//============
// Middleware
//============
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: false,}));

//====================
// Config - Controller
//====================
app.get("/", (req, res) => {
  res.send("Dog Tinder");
});
const usersController = require("./controllers/users");
const dogsController = require("./controllers/dogs");
const likeEventsController = require("./controllers/likeEvents");
const browseController = require("./controllers/browse");
const sessionsController = require("./controllers/sessions.js");
app.use("/users", usersController);
app.use("/dogs", dogsController);
app.use("/likeevents", likeEventsController);
app.use("/browse", browseController);
app.use("/sessions", sessionsController)

app.listen(PORT, () => {
  console.log("Dog matching 🐶 happening on port", PORT);
});
