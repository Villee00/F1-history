import mongoose from "mongoose";

const raceSchema = mongoose.Schema({
  date: Date,
  circuite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circuite",
  },
  grandPrix: String,
  pictureLink: String,
});

export default mongoose.model("Race", raceSchema);
