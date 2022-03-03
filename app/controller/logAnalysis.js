'use strict';

const Controller = require('egg').Controller;

class logAnalysisController extends Controller {
  async upload() {
    const { ctx } = this;
    const logData = ctx.request.body;
    ctx.app.state = {
      ...ctx.app.state || {},
      logData,
    }; // 暂时挂载变量上，以后用数据库储存
    ctx.body = { result: 100, state: ctx.state };
  }
}

module.exports = logAnalysisController;

