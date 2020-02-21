const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PasswordSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Password = mongoose.model('password', PasswordSchema);

module.exports = Password;
