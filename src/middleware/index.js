const logger = require('./logger');

const {DangerError} = require('./Errors/DangerError');
const {WarningError} = require('./Errors/WarningError');
const {InvalidParameterError} = require('./Errors/InvalidParameterError');

module.exports = {
  logger,
  DangerError,
  WarningError,
  InvalidParameterError,
};
