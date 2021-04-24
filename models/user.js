const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  inbox: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mail' }],
  outbox: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mail' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;