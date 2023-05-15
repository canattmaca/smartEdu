getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};
getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};
getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};
// };

module.exports = {
  getAboutPage,
  getIndexPage,
  getContactPage,
  getRegisterPage,
  getLoginPage,
  // getCoursesPage,
  // getDoashBoardPage,
};
