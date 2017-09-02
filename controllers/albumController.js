const Album = require("../models/album");

module.exports = {
  async create(req, res) {
    const { title, date, copiesSolid, numberTracks, image, revenue } = req.body;
    album = new Album({
      title,
      date,
      copiesSolid,
      numberTracks,
      image,
      revenue
    });
    console.log("asdfsdfasdfasdf");
    try {
      await album.save();
    
      res.send(album);
    } catch (err) {
      res.status(422).send(err);
    }
  },  
}
