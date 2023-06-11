const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
