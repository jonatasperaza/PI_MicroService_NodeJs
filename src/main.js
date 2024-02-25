const express = require('express');
const {SigaaRouter} = require('./App');

const app = express();

app.use('/sigaa', SigaaRouter);

app.get('/', (req, res) => {
  res.status(200).json({msg: 'Hello Word'});
});

module.exports = app;
