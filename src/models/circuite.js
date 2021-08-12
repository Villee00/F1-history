const mongoose = require('mongoose');

const circuitSchema = mongoose.Schema({
  name: String,
  country: String,
  lenght: Number,
});

module.exports = mongoose.model('Circuit', circuitSchema);