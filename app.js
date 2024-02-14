const express = require('express');
const logger = require('./src/middleware');
const pinoHttp = require('pino-http')({logger});
const cors = require('cors');
const {PORT} = require('./src/config');

const mainRouter = require('./src/main');

const app = express();

app.use(cors());
app.use(pinoHttp);
app.use('', mainRouter);

app.listen(PORT, () => {
  logger.info(`Server Iniciado: http://localhost:${PORT}`);
});
