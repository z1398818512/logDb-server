'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    async send() {
      console.log('user send')
      const roomId = this.ctx.socket.roomId ;
      const {data = {}} = this.ctx.args[0]|| {};
      this.ctx.app.io.of('/').to(roomId).emit('responseData',{
        state:100,
        data:data
      })
    }
    async sendonCeLog() {
      console.log('user sendonCeLog')
      const roomId = this.ctx.socket.roomId ;
      const data = this.ctx.args[0]|| {};
      this.ctx.app.io.of('/').to(roomId).emit('onCeLogData',{
        state:100,
        data:data
      })
    }
  }
  return Controller;
}