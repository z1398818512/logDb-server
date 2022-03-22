'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.response.type = 'html';
    const page = await readFilePromise(path.resolve(__dirname, '../../index.html'));
    ctx.body = page;
  }
}

module.exports = HomeController;
