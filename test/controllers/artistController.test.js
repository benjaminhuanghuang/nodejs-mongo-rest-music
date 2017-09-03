const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
//
const app = require("../../app");
const Artist = require("../../models/artist");

describe("Artist controller: ", () => {
  // Index
  it("GET to /api/artists find all artists", done => {
    const artist1 = new Artist({
      name: "artist1",
      age: 30,
    });

    const artist2 = new Artist({
      name: "artist2",
      age: 35,
    });

    Promise.all([artist1.save(), artist2.save()]).then(() => {
      request(app)
        .get("/api/artists")
        .end((err, res) => {
          assert(res.body.length === 2);
          assert(res.body[1].name === "artist2");
          done();
        });
    });
  });

  // Create
  it("Post to /api/artists creates a new artist", done => {
    Artist.count().then(count => {
      request(app)
        .post("/api/artists")
        .send({
          name: "BonJoe",
          age:30
        })
        .end((err, res) => {
          Artist.count().then(newCount => {
            done();
          });
        });
    });
  });
  // Delete
  it("DELETE to /api/artists/:id deleted a artist", done => {
    const artist = new Artist({ name: "1234" });
    artist.save().then(() => {
      request(app)
        .delete(`/api/artists/${artist._id}`)
        .end(() => {
          Artist.findOne({ name: "1234" }).then(artist => {
            assert(artist === null);
            done();
          });
        });
    });
  });
  // Edit
  it("PUT to /api/artists/:id edit an existing artist", done => {
    const artist = new Artist({ name: "abcd" });
    artist.save().then(count => {
      request(app)
        .put(`/api/artists/${artist._id}`)
        .send({ age: 80})
        .end((data) => {
          Artist.findOne({ name: "abcd" }).then(artist => {
            assert(artist.age === 80);
            done();
          });
        });
    });
  });

  // Search Artist
  it.only("Post to /api/searchArtists search artists", done => {
    const artist = new Artist({ name: "ben3" , age:40, yearsActive:50});
    artist.save().then(count => {
    request(app)
      .post("/api/searchArtists")
      .send({
        name: "ben3",
        age:{min:10, max:50}
      })
      .end((err, res) => {
        assert(res.body.all.length === 1);
        done();
      });
    });
  });
  
});
