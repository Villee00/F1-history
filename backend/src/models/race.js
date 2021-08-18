import mongoose from "mongoose";

const raceSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  circuit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circuit",
  },
  grandPrix: {
    type: String,
    unique: true,
  },
  pictureLink: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  laps: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Race", raceSchema);
