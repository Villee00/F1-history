const mongoose = require('mongoose');

const raceSchema = mongoose.Schema({
  date: Date,
  circuite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Circuite',
  },
  grandPrix: String,
  pictureLink: String,
});

module.exports = mongoose.model('Race', raceSchema);