const express = require('express');
const logger = require('./src/middleware');
const pinoHttp = require('pino-http')({logger});
const cors = require('cors');
require('dotenv').config();

const mainRouter = require('./src/main');

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(pinoHttp);
app.use('', mainRouter);

app.listen(port, () => {
  logger.info(`Server Iniciado: http://localhost:${port}`);
});
