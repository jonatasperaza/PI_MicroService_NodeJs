const {extractDataFromMessage} = require('../../helpers');
const fs = require('fs');

exports.loadCommomFunctions = ({socket, webMessage}) => {
  const {remoteJid, prefix, commandName, args, userJid, isReply, replyJid} =
    extractDataFromMessage(webMessage);

  if (!remoteJid) {
    return;
  }

  const sendText = async (text) => {
    return await socket.sendMessage(remoteJid, {
      text: `${BOT_EMOJI} ${text}`,
    });
  };

  const sendReply = async (text) => {
    return await socket.sendMessage(
        remoteJid,
        {text: `${BOT_EMOJI} ${text}`},
        {quoted: webMessage},
    );
  };

  const sendReact = async (emoji) => {
    return await socket.sendMessage(remoteJid, {
      react: {
        text: emoji,
        key: webMessage.key,
      },
    });
  };

  const sendSuccessReact = async () => {
    return await sendReact('✅');
  };

  const sendWaitReact = async () => {
    return await sendReact('⏳');
  };

  const sendWarningReact = async () => {
    return await sendReact('⚠️');
  };

  const sendErrorReact = async () => {
    return await sendReact('❌');
  };

  const sendSuccessReply = async (text) => {
    await sendSuccessReact();
    return await sendReply(`✅ ${text}`);
  };

  const sendWaitReply = async (text) => {
    await sendWaitReact();
    return await sendReply(`⏳ Aguarde! ${text}`);
  };

  const sendWarningReply = async (text) => {
    await sendWarningReact();
    return await sendReply(`⚠️ Atenção! ${text}`);
  };

  const sendErrorReply = async (text) => {
    await sendErrorReact();
    return await sendReply(`❌ Erro! ${text}`);
  };

  const sendStickerFromFile = async (file) => {
    return await socket.sendMessage(remoteJid, {
      sticker: fs.readFileSync(file),
    });
  };

  const sendImageFromFile = async (file) => {
    return await socket.sendMessage(remoteJid, {
      image: fs.readFileSync(file),
    });
  };

  return {
    socket,
    remoteJid,
    userJid,
    prefix,
    commandName,
    args,
    isReply,
    replyJid,
    webMessage,
    sendText,
    sendReply,
    sendStickerFromFile,
    sendImageFromFile,
    sendReact,
    sendSuccessReact,
    sendWaitReact,
    sendWarningReact,
    sendErrorReply,
    sendSuccessReply,
    sendWaitReply,
    sendWarningReply,
    sendErrorReact,
  };
};
