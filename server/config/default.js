const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  secret:   'mysecret',
  userkey: "88c91aa4d3b104b42b492f80d33e6fea", // токен для доступа к api text.ru
  countDocOnPage: 5, // сколько записей отдавать при запросе
  mongoose: {
    uri:     'mongodb://localhost:27017/app',
    options: {
      useMongoClient: true,
      keepAlive: 1,
      poolSize:      5

    }
  },
  crypto: {
    hash: {
      length:     128,
      iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
    }
  },
  root:     process.cwd()
};


