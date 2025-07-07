'use strict';


module.exports = () => {
  return async (ctx, next) => {

    const { roomId } = ctx.query; // 用户传来的唯一roomid
    const { adminMap, userMap } = ctx.app;
    const lasterUser = adminMap.get(roomId);
    if (lasterUser) {
      lasterUser.emit('exit', {
        state: 100,
        data: {},
        msg: '该远程用户被其他管理员登录，您已被挤下',
      });
    }
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
