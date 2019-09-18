const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

module.exports = async (config) => {
  const { app } = config;
  app.use(bodyParser());
  const router = new Router();

  router.get('/test', (ctx, next) => {
    // ctx.router available
    ctx.body = {test: "success"}
  });
  app
    .use(router.routes());
};