const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: {
    type: String,
    validate: {
      // validation function
      validator: title => title.length > 2,
      message: "Title must be longer than 2 characters."
    },
    required: [true, "Title is required."]
  },
  date: Date,
  copiesSolid: Number,
  numberTracks: Number,
  image: String,
  revenue: Number
});

const Album = mongoose.model("album", AlbumSchema);

module.exports = { AlbumSchema, Album };
