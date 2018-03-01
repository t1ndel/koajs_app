const User = require('../../models/user');
const passport = require('koa-passport');

// паспорт напрямую с базой не работает
passport.serializeUser(function(user, done) {
  done(null, user.id); 
});

passport.deserializeUser(function(id, done) {
  User.findById(id, done); 
});
