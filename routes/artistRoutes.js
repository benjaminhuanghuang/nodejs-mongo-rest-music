const _ = require('lodash');
//
const ArtistController = require('../controllers/artistController')

// Assign HTTP request to controller methods
module.exports = app => {
  app.post("/artists", ArtistController.create);
  
};

