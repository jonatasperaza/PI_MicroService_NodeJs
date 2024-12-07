const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const {logger} = require('./src/middleware');
const pinoHttp = require('pino-http')({logger});
const {PORT} = require('./src/config');

const mainRouter = require('./src/main');

const app = express();

app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ['self'],
          scriptSrc: ['self'],
          styleSrc: ['self'],
          objectSrc: ['none'],
          upgradeInsecureRequests: [],
        },
      },
      dnsPrefetchControl: {allow: false},
      expectCt: {enforce: true},
      frameguard: {action: 'deny'},
      hidePoweredBy: {setTo: 'PHP 4.2.0'},
      hsts: {maxAge: 5184000, preload: true},
      ieNoOpen: {setTo: 'false'},
      noSniff: true,
      referrerPolicy: {policy: 'strict-origin-when-cross-origin'},
      xssFilter: true,
    }),
);

app.use(cors());
app.use(pinoHttp);
app.use('/api', mainRouter);

app.listen(PORT, async () => {
  logger.info(`Server Iniciado: http://localhost:${PORT}`);
});
