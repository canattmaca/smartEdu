const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .route("/")
  .post(roleMiddleware(["teacher", "admin"]), courseController.createCourse); //http://localhost:3000/courses
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);
router
  .route("/:slug")
  .delete(roleMiddleware(["teacher", "admin"]), courseController.deleteCourse);
router
  .route("/:slug")
  .put(roleMiddleware(["teacher", "admin"]), courseController.updateCourse);
router.route("/enroll").post(courseController.enrollCourse); //http://localhost:3000/courses/enroll
router.route("/release").post(courseController.releaseCourse); //http://localhost:3000/courses/release

module.exports = router;
