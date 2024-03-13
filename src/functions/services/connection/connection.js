const {
  default: botConnect,
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
} = require('evobotbaileys');
const {Boom} = require('@hapi/boom');

const logger = require('../../../middleware/logger');

const store = makeInMemoryStore({logger});

/**
 * Conecta ao serviço do WhatsApp com credenciais fornecidas e inicializa o bot.
 * @return {Promise<Object>} Uma promise com informacoes do bot.
 */
async function connect() {
  const {state, saveCreds} = await useMultiFileAuthState(`./auth/baileys`);
  const bot = botConnect({
    logger,
    printQRInTerminal: true,
    browser: [`ZYRA`, 'Safari', '1.0.0'],
    auth: state,
    defaultQueryTimeoutMs: undefined,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
      }
      return {
        conversation: `BOT On!`,
      };
    },
  });
  store.bind(bot.ev);
  bot.serializeM = (msg) => smsg(bot, msg, store);

  bot.ev.on('connection.update', async (update) => {
    const {connection, lastDisconnect} = update;
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
      switch (reason) {
        case DisconnectReason?.badSession:
          bot.logout();
          break;
        case DisconnectReason?.connectionClosed:
        case DisconnectReason?.connectionLost:
        case DisconnectReason?.restartRequired:
        case DisconnectReason?.timedOut:
          await reconnect();
          break;
        case DisconnectReason?.connectionReplaced:
          bot.logout();
          break;
        case DisconnectReason?.loggedOut:
          bot.logout();
          break;
        case DisconnectReason?.Multidevicemismatch:
          bot.logout();
          break;
        default:
          bot.end(`Razão Desconhecida de Desconexão: ${reason}|${connection}`);
      }
    }
    if (
      update.connection === 'open' ||
      update.receivedPendingNotifications === 'true'
    ) {
      logger.info('BOT instanciado!');
    }
  });
  bot.ev.on('creds.update', saveCreds);
  return bot;
}

/**
 * Reconecta o bot após uma desconexão.
 * @return {Promise<void>} Uma promise que resolve quando o bot se reconectar.
 */
async function reconnect() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await connect();
}

module.exports = {
  connect,
};
