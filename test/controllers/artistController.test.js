const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
//
const app = require("../../app");
const Artist = require("../../models/artist");

describe("Artist controller: ", () => {
  // Index
  it("GET to /artists find all artists", done => {
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
        .get("/artists")
        .end((err, res) => {
          assert(res.body.length === 2);
          assert(res.body[1].name === "artist2");
          done();
        });
    });
  });

  // Create
  it("Post to /artists creates a new artist", done => {
    Artist.count().then(count => {
      request(app)
        .post("/artists")
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
  it("DELETE to /artists/:id deleted a artist", done => {
    const artist = new Artist({ name: "1234" });
    artist.save().then(() => {
      request(app)
        .delete(`/artists/${artist._id}`)
        .end(() => {
          Artist.findOne({ name: "1234" }).then(artist => {
            assert(artist === null);
            done();
          });
        });
    });
  });
  // Edit
  it("PUT to /artists/:id edit an existing artist", done => {
    const artist = new Artist({ name: "abcd" });
    artist.save().then(count => {
      request(app)
        .put(`/artists/${artist._id}`)
        .send({ age: 80 })
        .end(() => {
          Artist.findOne({ name: "abcd" }).then(artist => {
            assert(artist.age === 80);
            done();
          });
        });
    });
  });
});
