const _ = require('lodash');
//
const AlbumController = require('../controllers/albumController')

// Assign HTTP request to controller methods
module.exports = app => {
  app.post("/albums", AlbumController.create);

  app.delete("/albums/:id", AlbumController.remove);
  
};

