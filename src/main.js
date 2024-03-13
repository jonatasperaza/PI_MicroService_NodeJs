const express = require('express');
const {Sigaa, WhatsApp} = require('./App');

const app = express();

app.use('/sigaa', Sigaa);
app.use('/whatsapp', WhatsApp);

app.get('/', (req, res) => {
  res.status(200).json({msg: 'Hello Word'});
});

module.exports = app;
