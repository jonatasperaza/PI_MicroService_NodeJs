require('dotenv').config();

const studentInfo = {
  name: '',
  status: '',
  course: '',
};

const PORT = process.env.PORT;

module.exports = {
  PORT,
  studentInfo,
};
