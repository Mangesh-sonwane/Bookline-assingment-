const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  Student_id: { type: String, required: true },
  Marks: [
    {
      Physics: { type: Number },
      Maths: { type: Number },
      Chemistry: { type: Number },
      PT: { type: Number },
      Computer: { type: Number },
      English: { type: Number },
    },
  ],
});

const userSchema = new mongoose.Schema({
  Class5: {
    Year: { type: Number, required: true },
    Class_teacher: {
      type: String,
      required: true,
    },
    Subject_list: [
      {
        type: String,
        enum: ['Physics', 'Maths', 'Chemistry', 'PT', 'Computer', 'English'],
        required: true,
      },
    ],
    Students: [studentSchema],
  },
});

module.exports = mongoose.model('Class', userSchema);

