const express = require("express");
const categoryControllers = require("../controllers/categoryControllers");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router
  .route("/")
  .post(roleMiddleware("admin"), categoryControllers.createCategory); //http://localhost:3000/categories
router
  .route("/:id")
  .delete(roleMiddleware("admin"), categoryControllers.deleteCategory); //http://localhost:3000/categories

module.exports = router;
