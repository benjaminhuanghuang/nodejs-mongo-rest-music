const app = require("./app");

// only for heroku env.
// in dev env, we use a separate sever for client side
if (process.env.NODE_ENV === "production") {
  // express will serve up production assets like .js and .css
  app.use(express.static("client"));

  // express will serve up index.html if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    console.log("no route", req.path);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(8010, () => {
  console.log("Running on port 8010");
});