'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getAddress() {
    const address = '永丰路299号';
    return address;
  }
}

module.exports = UserService;
