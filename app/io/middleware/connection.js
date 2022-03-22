'use strict';
module.exports = () => {
  return async (ctx, next) => {
    console.log('disconnection!');
    const {roomId} = ctx.query; // 用户传来的唯一roomid
    ctx.socket.join(roomId)
    ctx.socket.roomId = roomId;
    
    await next();
  };
};
