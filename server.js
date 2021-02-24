const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/database1',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.use(require('./routes/htmlRoutes.js'));
app.use(require('./routes/apiRoutes.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});