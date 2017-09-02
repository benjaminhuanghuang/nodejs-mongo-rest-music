const Album = require("../models/album");

module.exports = {
  index(req, res, next) {
    Album.find({})  
    .then(albums => res.send(albums))
    .catch(next);
  },


  create(req, res, next) {
    const props = req.body;
    Album.create(props)
      .then(album => res.send(album))
      .catch(next)
  },

  // for /driver/:id
  edit(req, res, next) {
    const id = req.params.id;
    const props = req.body;

    // new : bool  true to return the modified document rather than the original. defaults to false
    Album.findByIdAndUpdate({ _id: id }, props, { new: true })
      .then(album => res.send(album))
      .catch(next);
  },

  // for /driver/:id
  delete(req, res, next) {
    const id = req.params.id;
    const props = req.body;

    // new : bool  true to return the modified document rather than the original. defaults to false
    Driver.findByIdAndRemove({ _id: id })
      .then(album => res.status(204).send(album))
      .catch(next);
  }
};
