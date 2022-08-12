const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var http = require('http');

// import routes
const authRoute = require('./routes/auth');
const studentRoute = require('./routes/students');
const classRoute = require('./routes/class');

dotenv.config();

// connect to DB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, () => {
  console.log('Connected to the MongoDB server');
});

// middlewares
app.use(express.json());

// routes middlewares
app.use('/api/user', authRoute);
app.use('/student', studentRoute);
app.use('/class', classRoute);

app.listen(3000, () => {
  console.log('Server Up and Running ');
});
