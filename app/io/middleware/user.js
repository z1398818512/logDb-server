'use strict';
const {backLink} = require('../../../config') 


module.exports = () => {
  return async (ctx, next) => {
    const { roomId } = ctx.query; // 用户传来的唯一roomid
    // console.log('user【' + roomId + '】已连接');
    const { userMap, adminMap } = ctx.app;
    userMap.set(roomId, ctx.socket);
    adminMap.forEach((socket, key) => {
      socket.emit('userList', {
        state: 100,
        data: [ ...userMap.keys() ],
        userId: key,
      });
    });
    
    ctx.socket.emit('pageUrl', {
      state: 100,
      data: `${backLink}?roomId=${roomId}`,
    });
    await next();
  };
};
