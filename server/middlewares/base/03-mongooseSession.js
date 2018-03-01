const session = require('koa-generic-session');
const mongooseStore = require('koa-session-mongoose');
const convert = require('koa-convert');

module.exports = convert(session({
  key:     'sid',
  cookie:  {
    httpOnly:  true,
    path:      '/',
    overwrite: true,
    signed:    false,
    maxAge:    3600 * 4 * 1e3
  },

  rolling: true,

  store: mongooseStore.create({
    model:   'Session',
    expires: 3600 * 4
  })
}));
