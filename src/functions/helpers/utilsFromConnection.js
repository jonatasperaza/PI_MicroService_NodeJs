const readline = require('readline');

const question = (message) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => rl.question(message, resolve));
};

const onlyNumbers = (text) => text.replace(/[^0-9]/g, '');

module.exports = {
  question,
  onlyNumbers,
};
