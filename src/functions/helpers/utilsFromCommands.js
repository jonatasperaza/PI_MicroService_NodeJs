const {COMMANDS_DIR} = require('../../config');
const path = require('path');
const fs = require('fs');

const formatCommand = (text) => {
  return this.onlyLettersAndNumbers(
      this.removeAccentsAndSpecialCharacters(text.toLocaleLowerCase().trim()),
  );
};

const onlyLettersAndNumbers = (text) => {
  return text.replace(/[^a-zA-Z0-9]/g, '');
};

const removeAccentsAndSpecialCharacters = (text) => {
  if (!text) return '';

  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};


const findCommandImport = (commandName) => {
  const command = this.readCommandImports();

  let typeReturn = '';
  let targetCommandReturn = null;

  for (const [type, commands] of Object.entries(command)) {
    if (!commands.length) {
      continue;
    }

    const targetCommand = commands.find((cmd) =>
      cmd.commands.map((cmd) => this.formatCommand(cmd)).includes(commandName),
    );

    if (targetCommand) {
      typeReturn = type;
      targetCommandReturn = targetCommand;
      break;
    }
  }

  return {
    type: typeReturn,
    command: targetCommandReturn,
  };
};

const readCommandImports = () => {
  const subdirectories = fs.readdirSync(COMMANDS_DIR, {withFileTypes: true})
      .filter((directory) => directory.isDirectory())
      .map((directory) => directory.name);

  const commandImports = {};

  for (const subdir of subdirectories) {
    const subdirectoryPath = path.join(COMMANDS_DIR, subdir);
    const files = fs.readdirSync(subdirectoryPath)
        .filter((file) =>
          !file.startsWith('_') &&
          (file.endsWith('.js') || file.endsWith('.ts')))
        .map((file) => require(path.join(subdirectoryPath, file)));

    commandImports[subdir] = files;
  }

  return commandImports;
};

const extractDataFromMessage = (webMessage) => {
  const textMessage = webMessage.message?.conversation;
  const extendedTextMessage = webMessage.message?.extendedTextMessage;
  const extendedTextMessageText = extendedTextMessage?.text;
  const imageTextMessage = webMessage.message?.imageMessage?.caption;
  const videoTextMessage = webMessage.message?.videoMessage?.caption;

  const fullMessage =
      textMessage ||
      extendedTextMessageText ||
      imageTextMessage ||
      videoTextMessage;

  if (!fullMessage) {
    return {
      remoteJid: null,
      userJid: null,
      prefix: null,
      commandName: null,
      isReply: false,
      replyJid: null,
      args: [],
    };
  }

  const isReply =
      !!extendedTextMessage && !!extendedTextMessage.contextInfo?.quotedMessage;

  const replyJid =
      !!extendedTextMessage && !!extendedTextMessage.contextInfo?.participant ?
      extendedTextMessage.contextInfo.participant : null;

  const userJid = webMessage?.key?.participant?.replace(
      /:[0-9][0-9]|:[0-9]/g,
      '',
  );

  const [command, ...args] = fullMessage.split(" ");
  const prefix = command.charAt(0);

  const commandWithoutPrefix = command.replace(new RegExp(`^[${PREFIX}]+`), "");

  return {
    remoteJid: webMessage?.key?.remoteJid,
    prefix,
    userJid,
    replyJid,
    isReply,
    commandName: this.formatCommand(commandWithoutPrefix),
    args: this.splitByCharacters(args.join(' '), ['\\', '|,', '/']),
  };
};

module.exports = {
  formatCommand,
  findCommandImport,
  onlyLettersAndNumbers,
  readCommandImports,
  removeAccentsAndSpecialCharacters,
  extractDataFromMessage,
};
