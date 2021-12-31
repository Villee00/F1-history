const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  driverNumber: [Number],
  firstName: String,
  lastName: String,
  nationality: String,
  dateOfBirth: String,
  races: [
    {
      race: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Race",
      },
      position: {
        type: String,
      },
      grid: {
        type: String,
      },
    },
  ],
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  }],
  wikipediaLink: String,
  seasonsDriven: [Number],
  pictureLink: String,
});

export default mongoose.model("Driver", driverSchema);
