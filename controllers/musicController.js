const Album = require("../models/album");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  }
}
