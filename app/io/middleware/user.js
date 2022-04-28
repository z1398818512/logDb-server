'use strict';
module.exports = () => {
  return async (ctx, next) => {
    
    const {roomId} = ctx.query; // 用户传来的唯一roomid
    ctx.socket.join(roomId)
    ctx.socket.roomId = roomId;
    console.log('用户【'+roomId+'】已连接');
    ctx.socket.emit('pageUrl',{
      state:100,
      data:`http://172.16.30.231:8000?roomId=${roomId}`
    })
    await next();
  };
};
