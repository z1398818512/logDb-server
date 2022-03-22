'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.post('/logAnalysis/upload', controller.logAnalysis.upload);
  io.of('/').route('query', app.io.controller.client.query);
  io.of('/').route('openRealLog', app.io.controller.client.openRealLog);

  
  io.of('/user').route('send', app.io.controller.user.send);
  io.of('/user').route('sendonCeLog', app.io.controller.user.sendonCeLog);
};
