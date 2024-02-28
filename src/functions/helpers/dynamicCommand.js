const {DangerError,
  WarningError,
  InvalidParameterError,
  verifyPrefix,
  hasTypeOrCommand,
  checkPermission,
} = require('../../middleware');

const {findCommandImport} = require('./utilsFromCommands');

const dynamicCommand = async (paramsHandler) => {
  const {commandName, prefix, sendWarningReply, sendErrorReply} =
    paramsHandler;
  const {type, command} = findCommandImport(commandName);

  if (!verifyPrefix(prefix) || !hasTypeOrCommand({type, command})) {
    return;
  }

  if (!(await checkPermission({type, ...paramsHandler}))) {
    await sendErrorReply('Você não tem permissão para executar este comando!');
    return;
  }

  try {
    await command.handle({
      ...paramsHandler,
      type,
    });
  } catch (error) {
    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`Parâmetros inválidos! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else {
      console.log(error);
      await sendErrorReply(
          `Ocorreu um erro ao executar o comando ${command.name}!\n
           O desenvolvedor foi notificado!\n
           *Detalhes*: ${error.message}`,
      );
    }
  }
};

module.exports = dynamicCommand;
