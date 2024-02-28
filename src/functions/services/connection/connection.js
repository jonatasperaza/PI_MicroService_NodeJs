const path = require('path');
const {question, onlyNumbers} = require('../../helpers');
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} = require('@whiskeysockets/baileys');

const {logger} = require('../../../middleware');

exports.connect = async () => {
  const {state, saveCreds} = await useMultiFileAuthState(
      path.resolve(__dirname, '..', 'assets', 'auth', 'baileys'),
  );

  const {version} = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    printQRInTerminal: false,
    version,
    logger,
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    markOnlineOnConnect: true,
  });

  if (!socket.authState.creds.registered) {
    const phoneNumber = await question('Informe o seu número de telefone: ');

    if (!phoneNumber) {
      throw new Error('Número de telefone inválido!');
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    console.log(`Código de pareamento: ${code}`);
  }

  socket.ev.on('connection.update', (update) => {
    const {connection, lastDisconnect} = update;

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        this.connect();
      }
    }

    if (update.connection === 'open' ||
        update.receivedPendingNotifications === 'true') {
      logger.info(`BOT conectado!\n
          -> Nome: ${socket.user.name}\n
          -> Numero: ${socket.user.id}`,
      );
    }
  });

  socket.ev.on('creds.update', saveCreds);

  return socket;
};
