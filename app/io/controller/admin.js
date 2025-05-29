'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    
    async query() {
      const parmse = this.ctx.args[0];
      const { roomId } = parmse; 
      const currentUserSocket = this.ctx.app.userMap.get(roomId);
      currentUserSocket && currentUserSocket.emit('query', {
        state: 100,
        data: parmse
      });
    }
    async openRealLog() {
      const parmse = this.ctx.args[0];
      const { roomId, data } = parmse;
      const currentUserSocket = this.ctx.app.userMap.get(roomId);
      currentUserSocket && currentUserSocket.emit('openRealLog', {
        state: 100,
        data,
      });
    }
    async sendScirpt() {
      const parmse = this.ctx.args[0];
      const { roomId, data } = parmse;
      const currentUserSocket = this.ctx.app.userMap.get(roomId);
      currentUserSocket && currentUserSocket.emit('handleScirpt', {
        state: 100,
        data,
      });
    }
    async disconnect() {
      const { socket, logger } = this.ctx;
      let removedId = null;

      for (const [ roomId, sock ] of this.app.adminMap.entries()) {
        if (sock === socket) {
          this.app.adminMap.delete(roomId);
          removedId = roomId;
          logger.info('admin断开:', roomId);
          break;
        }
      }
      if (removedId) {
        this.app.mapUpdateLogger();
      }
    }
    async get() {
      const roomId = this.ctx.socket.roomId;
      this.ctx.app.io.of('/').to(roomId).emit('query', {
        state: 100,
        data: 'hello'
      })
    }

  }
  return Controller;
}