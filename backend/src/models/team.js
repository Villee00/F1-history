import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  name: String,
});

export default mongoose.model("Team", teamSchema);
