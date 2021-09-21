import mongoose from "mongoose";

const raceSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  circuit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circuit",
    required: true,
  },
  grandPrix: {
    type: String,
    unique: true,
    required: true,
  },
  pictureLink: {
    type: String,
  },
  weather: {
    type: String,
    required: true,
  },
  laps: {
    type: Number,
  },
  length: {
    type: Number,
  },
  results: [
    {
      driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
      },
      position: {
        type: String,
      },
      grid: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Race", raceSchema);
