
const Koa = require('koa');
const app = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');

app.keys = [config.secret];

const path = require('path');
const fs = require('fs');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares', 'base')).sort();

middlewares.forEach(function(middleware) {
  app.use(require('./middlewares/base/' + middleware));
});

// для проверки авторизированности
const authcheck = require('./middlewares/authcheck.js');



const Router = require('koa-router');

const router = new Router();

router.post('/api/documentcheck', authcheck, require('./routes/documentcheck').post);

router.post('/api/document', authcheck, require('./routes/document').post);
router.get('/api/document/:num', authcheck, require('./routes/document').get);

router.get('/api/documentcount', authcheck, require('./routes/documentcount').get);

router.get('/api/documentpagination', authcheck, require('./routes/documentpagination').get);

router.get('/api/documentlist/:num', authcheck, require('./routes/documentlist').get);
router.get('/api/documentlist/', authcheck, require('./routes/documentlist').get);


router.post('/api/login', require('./routes/login').post);
router.post('/api/logout', require('./routes/logout').post);

router.get('/api/isauth', require('./routes/isauth').get);






app.use(async (ctx, next) => {
  if (!ctx.get('csrf-token')) ctx.set('csrf-token', ctx.csrf);
  await next();
});

app.use(router.routes());

module.exports = app;
