const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
//
const app = require("../../app");
const { Album } = require("../../models/album");

describe("Album controller: ", () => {
  // Index
  it("GET to /albums find all albums", done => {
    const album1 = new Album({
      title: "album1",
      date: Date.now(),
      copiesSolid: 100
    });

    const album2 = new Album({
      title: "album2",
      date: Date.now(),
      copiesSolid: 120
    });

    Promise.all([album1.save(), album2.save()]).then(() => {
      request(app)
        .get("/albums")
        .end((err, res) => {
          assert(res.body.length === 2);
          assert(res.body[1].title === "album2");
          done();
        });
    });
  });

  // Create
  it("Post to /albums creates a new album", done => {
    Album.count().then(count => {
      request(app)
        .post("/albums")
        .send({
          title: "Guns N' Rouses",
          date: Date.now(),
          copiesSolid: 1000,
          numberTracks: 1000,
          image: "cover.jpg",
          revenue: 100
        })
        .end((err, res) => {
          Album.count().then(newCount => {
            done();
          });
        });
    });
  });
  // Delete
  it("DELETE to /albums/:id deleted a album", done => {
    const album = new Album({ title: "1234" });
    album.save().then(() => {
      request(app)
        .delete(`/albums/${album._id}`)
        .end(() => {
          Album.findOne({ title: "1234" }).then(album => {
            assert(album === null);
            done();
          });
        });
    });
  });
  // Edit
  it("PUT to /albums/:id edit an existing album", done => {
    const album = new Album({ title: "abcd" });
    album.save().then(count => {
      request(app)
        .put(`/albums/${album._id}`)
        .send({ revenue: 1000 })
        .end(() => {
          Album.findOne({ title: "abcd" }).then(album => {
            assert(album.revenue === 1000);
            done();
          });
        });
    });
  });
});
