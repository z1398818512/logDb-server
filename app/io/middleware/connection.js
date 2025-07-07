'use strict';
module.exports = () => {
  let timer = null;
  function debounce(fn, delay) {
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  function mapUpdateLogger(ctx) {
    (debounce(() => {
      // console.log(`Map： admin【${[ ...ctx.app.adminMap.keys() ].join(',')}】,      user【${[ ...ctx.app.userMap.keys() ].join(',')}】`);
      ctx.logger.info('Map: admin 【%s】,      user【%s】',
        [ ...ctx.app.adminMap.keys() ].join(','),
        [ ...ctx.app.userMap.keys() ].join(','));
    }, 1000))();
  }
  return async (ctx, next) => {
    const { roomId, type } = ctx.query; // 用户传来的唯一roomid
    if (!ctx.app.adminMap) ctx.app.adminMap = new Map();
    if (!ctx.app.userMap) ctx.app.userMap = new Map();
    if (!ctx.app.mapUpdateLogger) ctx.app.mapUpdateLogger = mapUpdateLogger.bind(null, ctx);
    // console.log(`${type}<${roomId}>已连接`);
    ctx.logger.info('[%s <%s>]已连接', type, roomId);
    ctx.app.mapUpdateLogger();
    await next();
  };
};
