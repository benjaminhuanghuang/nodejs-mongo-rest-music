const express = require("express");
//
const app = require("./app");

// only for heroku env.
// in dev env, we use a separate sever for client side
// if (process.env.NODE_ENV === "production") {
if (true) {
  // express will serve up production assets like .js and .css
  app.use(express.static("client/public"));

  // express will serve up index.html if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    console.log("no route", req.path);
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

const PORT = process.env.PORT || 8010; // for heroku deployment
app.listen(PORT, () => {
  console.log("Running on port 8010");
});
