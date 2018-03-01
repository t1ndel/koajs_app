const passport = require('../../libs/passport');

// - инициализовать ctx.req._passport (вспомогательный контекст, нам не понадобится)
// - сделать на ctx методы
//   ctx.login(user)
//   ctx.logout()
//   ctx.isAuthenticated()
module.exports = passport.initialize();
