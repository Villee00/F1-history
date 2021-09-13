const mongoose = require("mongoose");

// TODO: Add more info fields
const driverSchema = mongoose.Schema({
  driverNumber: Number,
  firstName: String,
  lastName: String,
  nationality: String,
  dateOfBirth: Date,
  races: [
    {
      race: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Race",
      },
      position: {
        Type: Number,
      },
      grid: {
        Type: Number,
      },
    },
  ],
  wikipediaLink: String,
});

export default mongoose.model("Driver", driverSchema);
