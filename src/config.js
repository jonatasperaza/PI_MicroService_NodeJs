const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;

const PREFIX = '/';
const BOT_NUMBER = '554792091566';

const COMMANDS_DIR = path.join(__dirname, 'commands');
const TEMP_DIR = path.resolve(__dirname, '..', 'assets', 'temp');

const TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

module.exports = {
  PORT,
  PREFIX,
  BOT_NUMBER,
  COMMANDS_DIR,
  TEMP_DIR,
  TIMEOUT_IN_MILLISECONDS_BY_EVENT,
};
