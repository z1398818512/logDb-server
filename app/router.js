'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.post('/logAnalysis/upload', controller.logAnalysis.upload);
  io.of('/admin').route('query', app.io.controller.admin.query);
  io.of('/admin').route('openRealLog', app.io.controller.admin.openRealLog);
  io.of('/admin').route('sendScirpt', app.io.controller.admin.sendScirpt);
  io.of('/admin').route('disconnect', app.io.controller.admin.disconnect);
  io.of('/admin').route('get', app.io.controller.admin.get);



  io.of('/user').route('send', app.io.controller.user.send);
  io.of('/user').route('sendonCeLog', app.io.controller.user.sendonCeLog);
  io.of('/user').route('disconnect', app.io.controller.user.disconnect);

};
