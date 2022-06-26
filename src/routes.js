const envio = require('./controllers/envio.controller');
const config = require('./environment');

const routes = function routes(app) {
  app.use(config.basePath, envio);
};

module.exports = routes;
