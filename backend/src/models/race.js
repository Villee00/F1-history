import mongoose from "mongoose";

const raceSchema = mongoose.Schema({
  date: Date,
  circuit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circuit",
  },
  grandPrix: {
    type: String,
    unique: true,
  },
  pictureLink: String,
});

export default mongoose.model("Race", raceSchema);
