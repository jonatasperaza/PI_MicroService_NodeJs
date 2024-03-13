const fs = require('fs');

const {BOT_EMOJI} = require('../../../config');

/**
 * @param {Object} socket - Socket instanciado
 * @param {String} remoteJid - Numero que sera enviado
 * @return {Object} Obejto com as funcoes de envio.
 */
function loadCommomFunctions(socket, remoteJid) {
  const sendText = async (text) => {
    return await socket.sendMessage(remoteJid, {
      text: `${BOT_EMOJI} ${text}`,
    });
  };

  const sendImage = async (file, text) => {
    await socket.sendMessage(
        remoteJid,
        {image: {url: file}, caption: text, mimetype: 'image/png'},
    );
  };

  const sendSuccessReply = async (text) => {
    return await sendText(`✅ ${text}`);
  };

  const sendWaitReply = async (text) => {
    return await sendText(`⏳ Aguarde! ${text}`);
  };

  const sendWarningReply = async (text) => {
    return await sendText(`⚠️ Atenção! ${text}`);
  };

  const sendErrorReply = async (text) => {
    return await sendText(`❌ Erro! ${text}`);
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
    sendText,
    sendImage,
    sendStickerFromFile,
    sendImageFromFile,
    sendErrorReply,
    sendSuccessReply,
    sendWaitReply,
    sendWarningReply,
  };
};

module.exports = loadCommomFunctions;
