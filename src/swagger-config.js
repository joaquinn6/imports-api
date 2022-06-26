const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./environment');

const swaggerConfig = function swaggerConfig(app) {
  const options = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'imports API',
        version: '1.0.0',
        description: 'Node Imports API',
      },
      servers: [
        { url: 'http://localhost:3000' },
      ],
    },
    apis: ['./src/controllers/*.js', './src/models/*.js'],
  };

  const specs = swaggerJSDoc(options);
  app.use(`${config.basePath}/explorer`, swaggerUI.serve, swaggerUI.setup(specs));
  app.get(`${config.basePath}/swagger.json`, (request, response) => response.json(specs));
};

module.exports = swaggerConfig;