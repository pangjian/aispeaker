'use strict';

const Controller = require('egg').Controller;
const _ = require('lodash');
const messageBuilder = require('../common/message-builder');

class PandoraController extends Controller {
  async get() {
    const ctx = this.ctx;
    const req = ctx.request;
    // const query = _.get(req.body, 'query'); // 用户说的话
    const requestType = _.get(req.body, 'request.type'); // Start,Intent,End
    let message = 'nothing';
    if (requestType === 0) {
      // 唤醒词请求
      message = messageBuilder.buildResponseSimple('欢迎使用中行百宝箱', false);
    } else if (requestType === 1) {
      // 意图请求
      // message = messageBuilder.buildResponse([ '这是一个例子', '播放完成后退出' ], true);
      const slot_info = _.get(req.body, 'request.slot_info');
      if (slot_info) {
        const slot_intent_name = _.get(req.body, 'request.slot_info.intent_name');

        if (slot_intent_name === 'query_exchange') {
          const rateObj = await ctx.service.exchange.getExchange(slot_info.slots[0].value);
          message = messageBuilder.buildResponse([
            '银行现汇买入价' + rateObj.buyRate,
            '银行现汇卖出价' + rateObj.sellRate,
            '银行现钞买入价' + rateObj.buyNoteRate,
            '银行现钞卖出价' + rateObj.sellNoteRate,
          ], false, {
            lastCurrency: slot_info.slots[0].value,
          });
        }

        if (slot_intent_name === 'query_balance') {
          const balance = await ctx.service.account.getBalanceByAccountName(slot_info.slots[0].value);
          if (balance) {
            message = messageBuilder.buildResponseSimple('您' + slot_info.slots[0].value + '的余额是' + balance + '元', false);
          } else {
            message = messageBuilder.buildResponseSimple('无此账户', false);
          }

        }

        if (slot_intent_name === 'exchange_booking') {
          message = messageBuilder.buildResponseSimple('测试回复', false);
        }
      }
    } else if (requestType === 2) {
      // 结束词请求
      message = messageBuilder.buildResponseSimple('再见', true);
    }
    // this.ctx.body = rate;
    ctx.body = message;
  }
}

module.exports = PandoraController;
