FROM registry-vpc.cn-zhangjiakou.aliyuncs.com/raycloud-prod/node:16

WORKDIR /app
COPY . .
RUN npm config set registry https://registry.npmmirror.com

RUN npm install --production
ENTRYPOINT ["/usr/local/bin/npm", "run", "start"]
