const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const CourseModel = require('./models/Course');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.post('/add-course', async (req, res) => {
  const { courseName, authorName, description } = req.body;

  const course = new CourseModel({
    courseName,
    authorName,
  });

  await course.save();
  res.send(course);
});

app.get('/read', (req, res) => {
  CourseModel.find((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/update', async (req, res) => {
  const id = req.body.id;
  const newCourseName = req.body.newCourseName;

  try {
    await CourseModel.findById(id, (err, updatedCourse) => {
      updatedCourse.courseName = newCourseName;
      updatedCourse.save();
    });
  } catch (err) {
    console.log(err);
  }

  res.send('updated');
});

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await CourseModel.findByIdAndDelete(id).exec();
  res.send('deleted');
});

const username = 'mern-admin';
const password = 'admin123';
const dbName = 'mern-tut';
const PORT = process.env.PORT || 5000;
const dbURI = `mongodb+srv://${username}:${password}@nodejs.2gw6h.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log('Connected to Database');
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
