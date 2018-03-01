//GET. проверяет авторизированность пользователя
// если авторизирован, отдаст {authorize: true }, иначе {authorize: false}

exports.get = async function(ctx, next) {
  if (ctx.isAuthenticated()) {
    ctx.body = {authorize: true };
  } else {
    ctx.body = {authorize: false};
  }

};

