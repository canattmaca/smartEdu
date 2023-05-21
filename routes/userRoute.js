const express = require("express");
const { body } = require("express-validator");

const authControllers = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../modals/User");

const router = express.Router();

router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Please Enter Your Name"),
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email is already exists!");
          }
        });
      }),
    body("password").not().isEmpty().withMessage("Please Enter Valid Password"),
  ],
  authControllers.createUser
); //http://localhost:3000/users/signup
router.route("/login").post(authControllers.loginUser); //http://localhost:3000/users/login
router.route("/logout").get(authControllers.logoutUSer); //http://localhost:3000/users/logout=> buraya get isteyi yaptığım zaman session u destroy edip ana sayfaya dönücez
router
  .route("/dashboard")
  .get(authMiddleware, authControllers.getDoashboardPage); //http://localhost:3000/users/dashboard

router.route("/:id").delete(authControllers.deleteUser);

module.exports = router;
