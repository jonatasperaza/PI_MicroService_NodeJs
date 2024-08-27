const express = require('express');
const {getGradesStudents, studentGradesOptions} = require('../../functions');

const router = new express.Router();

router.get('/notas', async (req, res) => {
  const index = req.query.index;
  const user = req.query.user;
  const pass = req.query.pass;

  const data = {user, pass};

  if (!index || !user || !pass) {
    console.log(index, user, pass);
    return res.status(400).json({error: 'Missing parameters'});
  }

  const {studentInfo, grades} = await getGradesStudents(index, data);
  res.status(200).json({studentInfo, grades});
});

router.get('/student', async (req, res) => {
  const user = req.query.user;
  const pass = req.query.pass;

  const data = {user, pass};

  if (!user || !pass) {
    console.log(index, user, pass);
    return res.status(400).json({error: 'Missing parameters'});
  }

  const {studentInfo} = await studentGradesOptions(data);
  res.status(200).json({studentInfo});
});

module.exports = router;
