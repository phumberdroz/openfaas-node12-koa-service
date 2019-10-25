const fs = require('fs');
const { expect } = require('chai');
const configUtil = require('../util/config');

describe('test config function', () => {
  before(() => {
    if(fs.existsSync('/var/openfaas/secrets/test')) {
      fs.unlinkSync('/var/openfaas/secrets/test')
    }
  });

  it('tries to get undefined variable', async () => {
    const test = configUtil('test');
    expect(test).to.eql(undefined);
  });

  it('successfully get Env Var', async () => {
    process.env.test = 'env';
    const test = configUtil('test');
    expect(test).to.eql('env');
  });

  if (fs.existsSync('/var/openfaas/secrets/')) {
    it('successfully gets File Config', async () => {
      fs.writeFile('/var/openfaas/secrets/test', 'file', (err) => {
        if (err) throw err;
        const test = configUtil('test');
        expect(test).to.eql('file');
      });
    });
  }
});
