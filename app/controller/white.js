'use strict';

const Controller = require('egg').Controller;

// 内存存储数组（初始化在类外部保证持久化）
let userList = [];


class whiteController extends Controller {
// 新增用户保存接口
  async saveWhiteUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    const { logger } = ctx;

    // 参数校验
    if (!name) {
      ctx.status = 400;
      ctx.body = { error: '姓名不能为空' };
      return;
    }

    // 存储到内存数组
    userList.push(name);
    logger.info('白名单变化', userList);
    ctx.body = {
      result: 100,
    };
  }
  async getWhiteUser() {
    const { ctx } = this;
    ctx.body = {
      result: 100,
      data: userList,
    };
  }

  async delWhiteUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    const { logger } = ctx;

    // 参数校验
    if (!name) {
      ctx.status = 400;
      ctx.body = { error: '姓名不能为空' };
      return;
    }

    // 过滤删除并返回新数组
    const originalLength = userList.length;
    userList = userList.filter(item => item !== name);
    logger.info('白名单变化', userList);
    // 检查是否实际删除了数据
    if (userList.length === originalLength) {
      ctx.status = 404;
      ctx.body = { error: '用户不存在' };
      return;
    }

    ctx.body = {
      result: 100,
      data: '',
      message: '删除成功',
    };
  }

  async checkOpenOnline() {
    const { ctx } = this;
    const { name } = ctx.query;
    const isOnline = userList.includes(name);
    ctx.body = {
      result: 100,
      data: isOnline,
    };
  }


}

module.exports = whiteController;
