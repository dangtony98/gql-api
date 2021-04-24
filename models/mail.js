const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String
  }
});

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;