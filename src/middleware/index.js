const logger = require('./logger');
const checkPermission = require('./checkPermission');

const {DangerError} = require('./Errors/DangerError');
const {WarningError} = require('./Errors/WarningError');
const {InvalidParameterError} = require('./Errors/InvalidParameterError');

const {hasTypeOrCommand, verifyPrefix} = require('./prefixType');

module.exports = {
  logger,
  DangerError,
  WarningError,
  InvalidParameterError,
  hasTypeOrCommand,
  verifyPrefix,
  checkPermission,
};
