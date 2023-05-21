const Course = require("../modals/Course");
const Category = require("../modals/Category");
const User = require("../modals/User");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    res.status(201).redirect("/courses");
    // res.send('Yeni kurs olusturuldu');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    // Category filter işlemi yaptık
    const categorySlug = req.query.categories;
    const query = req.query.search;

    //category Course Modal içindeki category den geliyor
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      (filter.name = ""), (filter.category = null);
    }
    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user");
    const categories = await Category.find({});

    res.status(200).render("courses", {
      courses: courses,
      categories: categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const user = await User.findById(req.session.userID);
    const categories = await Category.find({});

    res.status(200).render("course-single", {
      course: course,
      page_name: "courses",
      categories: categories,
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
// User Modal' a Array tanımladım.Sonrasında course-single sayfasında form-input-button oluşturdum form methot:post action: courses/enroll şeklinde tanımladım. input içerisinde name=course_id  value=<%=course_id%> user.courses.push içerisinde id'si body.course_id olan kursu yakalamasını söylemiş oldum. value sunu tanımadığım için yakalayabilecek.

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug });
    req.flash("error", `${course.name} has been removed successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    req.flash("error", `${course.name} has been uptated successfully`);
    course.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
