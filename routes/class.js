const express = require('express');
const router = express.Router();
const Class = require('../model/Class');

// Get BACK ALL THE Student Details

router.get('/', async (req, res) => {
  try {
    const student = await Class.find();
    res.json(student);
    console.log('we are in class');
  } catch (err) {
    res.json({ message: err });
  }
});

// submit student details
router.post('/', async (req, res) => {
  const post = new Class({
    Class5: req.body.Class5,
    Year: req.body.Year,
    Class_teacher: req.body.Class_teacher,
    Students_list: req.body.Students_list,
    Students: req.body.Students,
  });

  try {
    const savedStudent = await post.save();
    res.json(savedStudent);
  } catch (error) {
    res.json({ message: error });
  }
});

// // get back specific student details by id
// router.get('/:studentId', async (req, res) => {
//   try {
//     const post = await Student.findById(req.params.studentId);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// // Delete Specific Student Details
// router.delete('/:studentId', async (req, res) => {
//   try {
//     const removeStudent = await Student.deleteOne({
//       _id: req.params.studentId,
//     });
//     res.json(removeStudent);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// // Update a Student Details

// router.patch('/:studentId', async (req, res) => {
//   try {
//     const updatedPost = await Student.updateOne(
//       { _id: req.params.studentId },
//       { $set: { id: req.body.id, name: req.body.name, DOB: req.body.DOB } }
//     );
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

module.exports = router;
