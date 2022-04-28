'use strict';
module.exports = () => {
  return async (ctx, next) => {
    const {roomId} = ctx.query; // 用户传来的唯一roomid
    console.log('用户['+roomId+']disconnection!');
    ctx.socket.join(roomId)
    ctx.socket.roomId = roomId;
    
    await next();
  };
};
