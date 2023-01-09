FROM node:latest
MAINTAINER DHAPARK
# 작업 폴더를 만들고 npm 설치
# 새로추가
RUN rm -rf /usr/src/app/* && mkdir /usr/src/app
COPY server /usr/src/app/server/
COPY client /usr/src/app/client/
COPY .env /usr/src/app/.env

RUN rm -rf /usr/src/app/server/public && rm -rf /usr/src/app/server/node_modules && rm -rf /usr/src/app/client/node_modules  && rm -rf /usr/src/app/server/public && mkdir /usr/src/app/server/public

WORKDIR /usr/src/app/client
RUN npm install --silent && npm run build
#서버
WORKDIR /usr/src/app

RUN mv -f client/build/* server/public/

WORKDIR /usr/src/app/server
RUN npm install

EXPOSE 80

CMD ["node","app.js"]