const mongoose = require("mongoose");

before(done => {
  mongoose.connect("mongodb://localhost/mongo-music-temp", { useMongoClient: true });

  mongoose.connection.once("open", () => done()).on("error", err => {
    console.warn("Warning", error);
  });
});

// clean collection before each test
beforeEach(done => {
  const { albums } = mongoose.connection.collections;
  albums.drop(() => {
    done();
  });
});