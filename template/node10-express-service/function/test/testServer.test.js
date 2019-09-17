const { expect } = require('chai');
const supertest = require('supertest');
const { init } = require('./server');

let request;
let app;

describe('test server', () => {
  before(async () =>{
    app = await init();
    request = supertest(app);
  });

  after(async () => {
    await app.close();
  });

  it('GET /test', async () => {
    const res = await request
      .get('/test')
      .expect(200);
    expect(res.body.test).to.equal("success");
  });

});