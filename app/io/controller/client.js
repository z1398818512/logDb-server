'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    async query() {
      const roomId = this.ctx.socket.roomId;
      const parmse = this.ctx.args[0];
      console.log('client query', parmse);
      this.ctx.app.io.of('/user').to(roomId).emit('query', {
        state: 100,
        data: parmse
      })
    }
    async openRealLog() {
      const roomId = this.ctx.socket.roomId;
      const parmse = this.ctx.args[0];
      console.log('client openRealLog', parmse);
      this.ctx.app.io.of('/user').to(roomId).emit('openRealLog', {
        state: 100,
        data: parmse
      })
    }
    async sendScirpt() {
      const roomId = this.ctx.socket.roomId;
      const parmse = this.ctx.args[0];
      console.log('client sendScirpt', parmse);
      this.ctx.app.io.of('/user').to(roomId).emit('handleScirpt', {
        state: 100,
        data: parmse
      })
    }
  }
  return Controller;
}