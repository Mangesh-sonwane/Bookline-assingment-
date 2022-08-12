const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Student_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Student', userSchema);
