// Copyright (c) Pierre Humberdroz 2019. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict"

const Koa = require('koa');
const app = new Koa();

const handler = require('./function/handler');

async function init() {
    await handler({"app": app});

    const port = process.env.http_port || 3000;

    app.listen(port);
   
}

init();