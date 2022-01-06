const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name:{
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    require: true,
    minlength: 6
  },
  favorites: {
    races: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Race'
    }],
    drivers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver'
    }],
  }
})

export default mongoose.model("User", userSchema);