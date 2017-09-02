const Artist = require("../models/artist");

module.exports = {
  index(req, res, next) {
    Artist.find({})  
    .then(artist => res.send(artist))
    .catch(next);
  },

  create(req, res, next) {
    const props = req.body;
    Artist.create(props)
      .then(artist => res.send(artist))
      .catch(next)
  },

  // for /driver/:id
  edit(req, res, next) {
    const id = req.params.id;
    const props = req.body;

    // new : bool  true to return the modified document rather than the original. defaults to false
    Artist.findByIdAndUpdate({ _id: id }, props, { new: true })
      .then(artist => res.send(artist))
      .catch(next);
  },

  // for /driver/:id
  delete(req, res, next) {
    const id = req.params.id;
    const props = req.body;

    // new : bool  true to return the modified document rather than the original. defaults to false
    Artist.findByIdAndRemove({ _id: id })
      .then(artist => res.status(204).send(artist))
      .catch(next);
  }
}
