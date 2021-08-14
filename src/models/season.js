const mongoose = require("mongoose");

const seasonSchema = mongoose.Schema({
  year: Number,
  races: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Race",
  },
});

module.exports = mongoose.model("Season", seasonSchema);
