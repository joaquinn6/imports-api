const express = require('express');
const morgan = require('morgan');
const swaggerConfig = require('./swagger-config');
const routes = require('./routes');
const logger = require('./logger');
const config = require('./environment');
const middleware = require('./middleware');
const mongoProvider = require('./core/mongodb_provider');

require('./models');

const app = express();
middleware(app);
swaggerConfig(app);

app.use(morgan('short'));


// Make our db accessible to our router
app.use((req, res, next) => {
  req.db = mongoProvider.db;
  next();
});

routes(app);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err,
  });
  next();
});

mongoProvider.connect(config).then(() => {
  app.listen(config.port, () => {
    logger.info(`Example app listening at http://localhost:${config.port}`);
  });
}).catch((reason) => {
  logger.error(reason);
});
