'use strict';


module.exports = () => {
  return async (ctx, next) => {

    const { roomId } = ctx.query; // 用户传来的唯一roomid
    const { adminMap, userMap } = ctx.app;
    adminMap.set(roomId, ctx.socket);
    const userList = [ ...userMap.keys()];
    ctx.socket.emit('userList', {
      state: 100,
      data: userList,
      userId: roomId,
    });
    // console.log(`admin 【${roomId}】已连接!`);

    await next();
  };
};
