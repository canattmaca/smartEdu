const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const session = require("express-session");

const User = require("../modals/User");
const Category = require("../modals/Category");
const Course = require("../modals/Course");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg} `);
    }
    res.status(400).redirect("/register");
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //mongoose 6 callback function almıyor
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "Your password is not correct!");
          res.status(400).redirect("/login");
        }
      });
    } else {
      req.flash("error", "User is not exist!");
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUSer = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
//Tekil sayfada öğrencinin seçmiş olduğu kursları yüklemek istiyorum bu yüzden populate fonksiyonu ile user.courses arrayine ulaşıyorum.Courses için de Course modeli içerisindeki req.session.userID ile giriş yaptığım user'ın ilgili kurslarını çağırıyorum.

exports.getDoashboardPage = async (req, res) => {
  const users = await User.find({});
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find({});
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user: user,
    users: users,
    categories: categories,
    courses: courses,
  });
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    //teacher sildiğinde course, user bölümündeki useri silersin ama kurslar kalır. Önüne geçmek için kursların içindeki user id ye sahip olan tüm kursları siliyoruz.
    await Course.deleteMany({ user: req.params.id });
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
