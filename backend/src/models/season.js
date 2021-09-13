const mongoose = require("mongoose");

const seasonSchema = mongoose.Schema({
  year: Number,
  races: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Race",
    },
  ],
  drivers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  ],
});

export default mongoose.model("Season", seasonSchema);
