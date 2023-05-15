const Course = require('../modals/Course');
const Category = require('../modals/Category');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course: course,
    });
    // res.send('Yeni kurs olusturuldu');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    //category Course Modal içindeki category den geliyor
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    const courses = await Course.find(filter);
    const categories = await Category.find({});

    res.status(200).render('courses', {
      courses: courses,
      categories: categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res
      .status(200)
      .render('course-single', { course: course, page_name: 'courses' });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};
