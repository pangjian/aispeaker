'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

const accountData = [
  {
    id: '12345678',
    num: '6227621184595327',
    name: '工资卡',
    balance: '12000.50',
  }, {
    id: '22345678',
    num: '4227621184595327',
    name: '借记卡',
    balance: '300.50',
  },
];

class AccountService extends Service {

  async getBalanceByAccountName(accountName) {

    const account = _.find(accountData, function(o) {
      return o.name === accountName;
    });
    return account.balance;
  }
}


module.exports = AccountService;
