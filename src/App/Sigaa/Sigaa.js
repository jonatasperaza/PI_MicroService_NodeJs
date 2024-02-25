const express = require('express');
const {getGradesStudents} = require('../../functions');

const router = new express.Router();

router.get('/notas', async (req, res) => {
  const index = req.query.index;
  const user = req.query.user;
  const pass = req.query.pass;

  const data = {user, pass};

  if (!index || !user || !pass) {
    return router.status(400).json({error: 'Missing parameters'});
  }

  const {studentInfo, grades} = await getGradesStudents(index, data);
  res.status(200).json({studentInfo, grades});
});

module.exports = router;
