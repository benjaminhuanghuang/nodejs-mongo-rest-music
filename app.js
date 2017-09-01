const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();
const keys = require("./config/keys");


mongoose.Promise = global.Promise;

// Use testing database for testing
if (process.env.NODE_ENV !== "test")
  mongoose.connect(keys.mongoURI, { useMongoClient: true });

// middleware
app.use(bodyParser.json());

routes(app);

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(422).send({ error: err.message });
});

module.exports = app;