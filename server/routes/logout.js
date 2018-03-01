
// чистит сессию, разлогинивает пользователя
exports.post = async function(ctx, next) {
  ctx.logout();

  ctx.session = null; 

  ctx.body = {logout: true}

};
