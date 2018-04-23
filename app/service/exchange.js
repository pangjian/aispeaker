'use strict';

const Service = require('egg').Service;

class ExchangeService extends Service {
  async getExchange(currency) {
    // PsnGetAllExchangeRateOutlay
    const ctx = this.ctx;
    const result = await ctx.curl('https://ccsa.ebsnew.boc.cn/BMPS/_bfwajax.do', {
      method: 'POST',
      data: {
        json: JSON.stringify({
          method: 'PsnGetExchangeOutlay',
          params: {
          },
          header: {
            agent: 'WEB15',
          },
        }),
      },
      dataType: 'json',
    });
    const res = result.data;
    let currencyObj = {};
    if (res.result) {

      currencyObj = _.find(res.result, { curCode: currency });
    }
    return currencyObj;
  }
}

module.exports = ExchangeService;
