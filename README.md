OpenFaaS Node.js 12 (LTS) and koa micro-service template
=============================================

This template provides Node.js 12 (LTS) and full access to [koa](https://koajs.com/) for building microservices for [OpenFaaS](https://www.openfaas.com), Docker, Knative and Cloud Run.

With this template you can create a new microservice and deploy it to a platform like [OpenFaaS](https://www.openfaas.com) for:

* scale-to-zero
* horizontal scale-out
* metrics & logs
* automated health-checks
* sane Kubernetes defaults like running as a non-root user

## Status of the template

This template is experimental and I would like your feedback through GitHub issues.

## Supported platforms

* x86_64

## Get started

You can create or scaffold a new microservice using the [OpenFaaS CLI](https://github.com/openfaas/faas-cli).

```
# USERNAME is your Docker Hub account or private Docker registry
$ export USERNAME=phumberdroz

$ faas template pull https://github.com/phumberdroz/openfaas-node12-koa-service
$ faas new --lang node12-koa-service microservice1 --prefix="${USERNAME}"
```

Once you've written your code you can run `faas-cli build` to create a local Docker image, then `faas-cli push` to transfer it to your registry.

You can now deploy it to OpenFaaS, Knative, Google Cloud Run or even use `docker run`.

See also: [Deploy OpenFaaS](https://docs.openfaas.com/deployment/)

## Example usage

### Minimal example with one route

```js
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
```

### Minimal example with one route and `npm` package

```
npm install --save moment
```

```js
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const moment = require('moment');

module.exports = async (config) => {
  const { app } = config;
  app.use(bodyParser());
  const router = new Router();

  router.get('/test', (ctx, next) => {
    // ctx.router available
    ctx.body = {time: moment()}
  });
  app
    .use(router.routes());
};
```

### Example usage with multiple routes, middleware and ES6

```js
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

module.exports = async (config) => {
  const { app } = config;
  app.use(bodyParser());
  const router = new Router();
  router.use((ctx, next) => {
    ctx.state.route = ctx._matchedRoute;
    return next();
  })
  router.get('/test', (ctx, next) => {
    // ctx.router available
    ctx.body = {time: moment()}
  });
  router.post('/test', (ctx, next) => {
    ctx.body = ctx.request.body;
  })
  app
    .use(router.routes());
```
