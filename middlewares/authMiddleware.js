const User = require('../modals/User');

// ozel middleware olusturuldu
module.exports = (req, res, next) => {
  // eger kullanici yok ise veya hata olursa login sayfasina yonlendirilmesi saglandi
  const userID = req.session.userID;
  User.findById(userID)
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      next();
    })
    .catch((err) => {
      return res.redirect('/login');
    });
};
