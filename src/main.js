const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  res.status(200).json({msg: 'Hello Word'});
});

module.exports = router;
