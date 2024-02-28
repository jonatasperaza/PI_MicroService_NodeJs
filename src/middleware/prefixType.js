const {PREFIX} = require('../config');

const verifyPrefix = (prefix) => PREFIX === prefix;
const hasTypeOrCommand = ({type, command}) => type && command;

module.exports = {
  verifyPrefix,
  hasTypeOrCommand,
};
