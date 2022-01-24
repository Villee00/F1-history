const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
  driverNumber: [Number],
  firstName: String,
  lastName: String,
  nationality: String,
  dateOfBirth: String,
  races: [
    {
      race: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Race',
      },
      position: {
        type: String,
      },
      grid: {
        type: String,
      },
    },
  ],
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
  wikipediaLink: String,
  seasonsDriven: [Number],
  pictureLink: String,
  picture: {
    link: {
      type: String,
    },
    author: {
      type: String,
    },
    source: {
      type: String,
    },
    description: {
      type: String,
    },
    license: {
      type: String,
    },
    licenseInfo: {
      type: String,
    },
  },
});

export default mongoose.model('Driver', driverSchema);
