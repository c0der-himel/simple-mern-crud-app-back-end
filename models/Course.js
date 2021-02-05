const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

const CourseModel = mongoose.model('course', courseSchema);

module.exports = CourseModel;
