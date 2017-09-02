const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
//
const app = require("../../app");
const Album = require('../../models/album');

describe("Album controller: ", () => {
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
});
