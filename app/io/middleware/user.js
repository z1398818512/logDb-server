'use strict';
module.exports = () => {
  return async (ctx, next) => {
    console.log('用户已连接');
    const {roomId} = ctx.query; // 用户传来的唯一roomid
    ctx.socket.join(roomId)
    ctx.socket.roomId = roomId;
    ctx.socket.emit('pageUrl',{
      state:100,
      data:`localhost:8000?roomId=${roomId}`
    })
    await next();
  };
};
