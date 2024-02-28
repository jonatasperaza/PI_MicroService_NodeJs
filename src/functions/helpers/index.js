const uploadTelegra = require('./uploladTelegra');
const getGradesType = require('./getGradesType');
const dynamicCommand = require('./dynamicCommand');

const {onlyNumbers, question} = require('./utilsFromConnection');

module.exports = {
  uploadTelegra,
  getGradesType,
  onlyNumbers,
  question,
  dynamicCommand,
};
