const Artist = require("../models/artist");

module.exports = {
  async create(req, res) {
    const { name } = req.body;
    artist = new Artist({
      name,
    });

    try {
      await artist.save();
    
      res.send(artist);
    } catch (err) {
      res.status(422).send(err);
    }
  },  
}
