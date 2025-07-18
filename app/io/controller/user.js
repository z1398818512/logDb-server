'use strict';

const fs = require('fs');
const sourceMap = require('source-map');
const Stacktracey = require('stacktracey');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const sourceMapFileContent = fs.readFileSync(resolve('./soucemap/main.6268e5bb.js.map'), 'utf-8');


module.exports = app => {
  class Controller extends app.Controller {
    async send() {
      // console.log('user send')
      // const roomId = this.ctx.socket.roomId;
      const { data = {}, roomId } = this.ctx.args[0] || {};
      const currentAdminSocket = this.ctx.app.adminMap.get(roomId);
      if (false) {
        try {
          for (let item of data.dataList || []) {
            const { infoData = [] } = item;
            const { lineNo, columnNo, stack } = infoData;
            if (item.logType === 'error \\n js执行错误') {
              if (lineNo && columnNo) {
                let consumer = await new sourceMap.SourceMapConsumer(sourceMapFileContent)
                // 原始文件里的行和列对象
                const originalPosition = consumer.originalPositionFor({
                  line: typeof lineNo === "string" ? parseInt(lineNo) : lineNo, // 压缩后的行号
                  column: typeof columnNo === "string" ? parseInt(columnNo) : columnNo // 压缩后的列号
                });
                // 原始文件代码
                if (originalPosition.source) {
                  const sourceContent = consumer.sourceContentFor(originalPosition.source);
                  item.sourceContent = sourceContent;
                  item.originalPosition = originalPosition;
                }
  
                //  ... send
              } else if (stack) {
                // 解析错误栈信息
                const tracey = new Stacktracey(stack);
                const sourceMapContent = JSON.parse(sourceMapFileContent);
                // 根据source map文件创建SourceMapConsumer实例
                const consumer = await new sourceMap.SourceMapConsumer(sourceMapContent);
                // 获取第一条错误栈信息
                const errorInfo = tracey.items[0]
                console.log(errorInfo, '=errorInfo=')
                const originalPosition = consumer.originalPositionFor({
                  line: errorInfo.line,
                  column: errorInfo.column,
                });
                if (originalPosition.source) {
                  // 获取源码内容
                  const sourceContent = consumer.sourceContentFor(originalPosition.source);
                  item.sourceContent = sourceContent;
                  item.originalPosition = originalPosition;
                }
  
                // ... send
              }
            }
          }
        } catch (err) {
          console.log('程序内部错误',err)
        }
      }


      currentAdminSocket && currentAdminSocket.emit('responseData', {
        state: 100,
        data,
      });
    }
    async sendonCeLog() {
      // console.log('user sendonCeLog')
      // const roomId = this.ctx.socket.roomId;
      const { data = {}, roomId } = this.ctx.args[0] || {};
      const currentAdminSocket = this.ctx.app.adminMap.get(roomId);
      currentAdminSocket && currentAdminSocket.emit('onCeLogData', {
        state: 100,
        data,
      })
    }
    async disconnect() {
      const { socket, logger } = this.ctx;
      let removedId = null;

      for (const [ roomId, sock ] of this.app.userMap.entries()) {
        if (sock === socket) {
          this.app.userMap.delete(roomId);
          removedId = roomId;
          logger.info('user断开:', roomId);
          break;
        }
      }
      if (removedId) {
        this.app.mapUpdateLogger();
        this.app.adminMap.forEach(adminSocket => {
          adminSocket.emit('userList', {
              state: 100,
              data: Array.from(this.app.userMap.keys())
          });
      });
      }
    }
  }
  return Controller;
}