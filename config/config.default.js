'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524191919001_4692';

  // add your config here
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.middleware = [];

  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  return config;
};
