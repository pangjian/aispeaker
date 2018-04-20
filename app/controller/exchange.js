'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const messageBuilder = require('../common/message-builder');

class ExchangeController extends Controller {
  async get() {
    const ctx = this.ctx;
    const query = _.get(ctx.body, 'request.intent.query'); // 用户说的话
    const requestType = _.get(ctx.body, 'request.intent.request_type'); // Start,Intent,End
    const rate = await ctx.service.exchange.getExchange();
    let message = '';
    if (requestType === 'Start') {
      message = messageBuilder.buildResponseSimple(query + rate, false);
    } else {
      message = messageBuilder.buildResponse([ '这是一个例子', '播放完成后退出' ], true);
    }
    // this.ctx.body = rate;
    ctx.body = message;
  }
}

module.exports = ExchangeController;
