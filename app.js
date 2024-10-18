const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', indexRouter);

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((error) => {
    console.error('DB connection fail:', error.message);
    process.exit(1);
  });

app.listen(5000, () => {
  console.log('Server listen at 5000');
});
