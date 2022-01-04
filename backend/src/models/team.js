const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const teamSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});
teamSchema.plugin(uniqueValidator);
export default mongoose.model("Team", teamSchema);
