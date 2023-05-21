// const nodemailer = require("nodemailer");
const Course = require("../modals/Course");
const User = require("../modals/User");

getIndexPage = async (req, res) => {
  console.log(req.session.UserID);
  const courses = await Course.find().sort("-createdAt").limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });

  res.status(200).render("index", {
    page_name: "index",
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};
getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

module.exports = {
  getAboutPage,
  getIndexPage,
  getContactPage,
  getRegisterPage,
  getLoginPage,
  // sendEmail,
};
