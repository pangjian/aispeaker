'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const messageBuilder = require('../common/message-builder');

class ExchangeController extends Controller {
  async get() {
    const ctx = this.ctx;
    const req = ctx.request;
    const query = _.get(req.body, 'query'); // 用户说的话
    const requestType = _.get(req.body, 'request.type'); // Start,Intent,End
    let message = '';
    if (requestType === 0) {
      // 唤醒词请求
      message = messageBuilder.buildResponseSimple('欢迎使用中行牌价', false);
    } else if (requestType === 1) {
      // 意图请求
      // message = messageBuilder.buildResponse([ '这是一个例子', '播放完成后退出' ], true);
      const slot_info = _.get(req.body, 'request.slot_info');
      if (slot_info) {
        if (_.get(req.body, 'request.slot_info.intent_name') === 'query_exchange') {
          const rateObj = await ctx.service.exchange.getExchange(slot_info.slots[0].value);
          message = messageBuilder.buildResponse([ '这是一个例子', '播放完成后退出' ], true);
        }

      }
    } else {
      // 结束词请求

    }
    // this.ctx.body = rate;
    ctx.body = message;
  }
}

module.exports = ExchangeController;
