const { version } = require('../../package.json');
const config = require('../config/config');

/*
const { networkInterfaces } = require('os');
const ip = Object.values(networkInterfaces()).flat().find(i => i.family == 'IPv4' && !i.internal).address;
*/

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-express-boilerplate API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `https://${config.ip}:${config.port}/v1`,
    },
    {
      url: `https://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
