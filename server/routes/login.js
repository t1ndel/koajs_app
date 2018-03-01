
const passport = require('koa-passport');

//POST. логинит юзера используя модуль passport.js и локальную стратегию

exports.post = function(ctx, next) {


  return passport.authenticate('local', async function(err, user, info) {

    if (err) throw err;

    if (user === false) {
      ctx.status = 401;
      ctx.body = { error: info };
    } else {
      ctx.body = {
        user: user.getPublicFields()
      };
      await ctx.login(user);
    }
  })(ctx, next);

};
