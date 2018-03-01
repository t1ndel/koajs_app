// проверяет, авторизирован ли юзер
module.exports = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.throw(401, 'Unauthorized');
  }

};

