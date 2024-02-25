const initBrowser = require('./initBrowser');
const loginSigaa = require('./loginSigaa');
const studentGradesOptions = require('./studentGradesOptions');
const getGradesStudents = require('./getGradesStudents');
const sigaaMobileOptions = require('./sigaaMobileOptions');

module.exports = {
  loginSigaa,
  initBrowser,
  sigaaMobileOptions,
  getGradesStudents,
  studentGradesOptions,
};
