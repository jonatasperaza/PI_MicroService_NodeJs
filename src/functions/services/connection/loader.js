const {TIMEOUT_IN_MILLISECONDS_BY_EVENT} = require('../../../config');
const {loadCommomFunctions} = require('../Commom/loadCommomFunctions');
const {dynamicCommand} = require('../../helpers');

exports.load = (socket) => {
  socket.ev.on('messages.upsert', async ({messages}) => {
    setTimeout(async () => {
      if (!messages.length) {
        return;
      }
      const webMessage = messages[0];
      const commonFunctions = loadCommomFunctions({socket, webMessage});

      if (!commonFunctions) {
        return;
      }

      await dynamicCommand(commonFunctions);
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });
};
