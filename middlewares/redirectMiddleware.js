const User = require('../modals/User');

// ozel middleware olusturuldu
module.exports = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect('/');
  }
  next();
};
