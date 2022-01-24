const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});
export default mongoose.model('Team', teamSchema);
