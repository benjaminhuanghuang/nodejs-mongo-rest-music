const MusicController = require('../controllers/musicController')

// Assign HTTP request to controller methods
module.exports = app => {
  app.get("/test", MusicController.greeting);
};