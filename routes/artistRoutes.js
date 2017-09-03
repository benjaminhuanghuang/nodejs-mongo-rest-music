//
const ArtistController = require("../controllers/artistController");

// Assign HTTP request to controller methods
module.exports = app => {
  app.get("/artists", ArtistController.index);

  app.post("/artists", ArtistController.create);

  app.delete("/artists/:id", ArtistController.delete);

  app.put("/artists/:id", ArtistController.edit);

  app.post("/api/searchArtists", ArtistController.searchArtists);

  app.get("/api/ageRange", ArtistController.getAgeRange);

  app.get("/api/yearsActiveRange", ArtistController.getYearsActiveRange);
};
