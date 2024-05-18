const express = require("express");
require("dotenv").config(); // need this to use env variables
const logger = require("morgan");
const bodyParser = require("body-parser");
const connectDb = require("./config/database");
const validation = require("./app/api/controllers/validation");

const mongoose = require("./config/database"); //database configuration

const PORT = 4001;

const app = express();

//connect to database
connectDb.connect();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const movies = require("./routes/movies");
const users = require("./routes/users");

app.use(movies);
app.use("/movies", validation.validateUser, movies);

app.use(users);
app.use("/users", users);

// handle 404
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.get("/", (req, res) => {
  res.json({ tutorial: "Building Your Rest API" });
});

app.listen(PORT, () => {
  console.log(`Node JS Server Listening On port ${PORT}`);
});
