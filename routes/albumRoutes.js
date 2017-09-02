const _ = require('lodash');
//
const AlbumController = require('../controllers/albumController')

// Assign HTTP request to controller methods
module.exports = app => {
  app.get('/albums', AlbumController.index);

  app.post("/albums", AlbumController.create);

  app.delete("/albums/:id", AlbumController.delete);
  
  app.put("/albums/:id", AlbumController.edit);
};

