/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644920149920_8515';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  };
  const security = {
    csrf: false,
    domainWhiteList: [ '*' ],
    // ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  };
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    origin: '*',
  };
  config.bodyParser = {
    jsonLimit: '500mb',
    formLimit: '500mb',
  };
  config.io = {
    init: {
      path: '/logdb/socket.io',
      cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ],
      },
    },
    namespace: {
      '/': {
        connectionMiddleware: [ 'connection' ],
        packetMiddleware: [],
      },
      '/user': {
        connectionMiddleware: [ 'user' ],
        packetMiddleware: [],
      },
      '/admin': {
        connectionMiddleware: [ 'admin' ],
        packetMiddleware: [],
      },
    },
  };
  const cluster = {
    workers: 1, //
  };

  return {
    ...config,
    ...userConfig,
    view,
    security,
    cluster,
  };
};
