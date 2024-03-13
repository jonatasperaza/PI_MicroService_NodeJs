const express = require('express');
const {connect, loadCommomFunctions} = require('../../functions/services');
const {messageUser} = require('../../functions/helpers');
const {getGradesStudents} = require('../../functions');

const router = new express.Router();

router.get('/send-grades', async (req, res) => {
  const index = req.query.index;
  const user = req.query.user;
  const pass = req.query.pass;
  const number = req.query.number;

  if (!index || !user || !pass) {
    return router.status(400).json({error: 'Missing parameters'});
  }

  const bot = await connect();
  const {sendImage} = loadCommomFunctions(bot, `${number}@s.whatsapp.net`);

  const data = {user, pass};

  const {studentInfo, grades} = await getGradesStudents(index, data);
  const {name, course, gradesImage} = studentInfo;

  const fullMessage = messageUser(name, course, grades);
  await sendImage(gradesImage, fullMessage);
  res.status(200).json({msg: `Mensagem enviada para o numero: ${number}`});
});

module.exports = router;
