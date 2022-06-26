const environment = process.env.NODE_ENV || 'local';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`./.config/${environment}`);

module.exports = config;
