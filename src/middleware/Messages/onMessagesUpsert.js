const {dynamicCommand} = require('../../functions/helpers');
const {loadCommomFunctions} = require('../../functions/services');

exports.onMessagesUpsert = async ({socket, messages}) => {
  if (!messages.length) {
    return;
  }

  const webMessage = messages[0];
  const commonFunctions = loadCommomFunctions({socket, webMessage});

  if (!commonFunctions) {
    return;
  }

  await dynamicCommand(commonFunctions);
};
