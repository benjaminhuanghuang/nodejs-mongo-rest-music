const mongoose = require("mongoose");

before(done => {
  mongoose.connect("mongodb://localhost/mongo-music-temp", {
    useMongoClient: true
  });

  mongoose.connection.once("open", () => done()).on("error", err => {
    console.warn("Warning", error);
  });
});

// clean collection before each test
beforeEach(done => {
  const { albums, artists } = mongoose.connection.collections;
  // This approach does not work when album doesn't exist
  // albums.drop().then(() => {
  //     artists.drop()
  //       .then(() => done())
  //       .catch(() => done());
  //   })
  //   .catch(() => done());
  albums.drop(() => {
    artists.drop(() => {
      done();
    });
  });
});
