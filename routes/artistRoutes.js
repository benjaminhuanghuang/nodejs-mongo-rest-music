//
const ArtistController = require("../controllers/artistController");

// Assign HTTP request to controller methods
module.exports = app => {
  app.get("/artists", ArtistController.index);

  app.post("/api/artists", ArtistController.create);
  
  app.get("/api/artists/:id", ArtistController.get);
  
  app.delete("/api/artists/:id", ArtistController.delete);

  app.put("/api//artists/:id", ArtistController.edit);

  app.post("/api/searchArtists", ArtistController.searchArtists);

  app.get("/api/ageRange", ArtistController.getAgeRange);

  app.get("/api/yearsActiveRange", ArtistController.getYearsActiveRange);

  
};
