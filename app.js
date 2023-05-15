const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const port = 3000;

//Template Engine
app.set('view engine', 'ejs');

//Global Variable
global.userIN = null;

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/smartedu-db').then((err) => {
  console.log('DB connected successfully');
});

//MiddleWares

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'mykeyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/smartedu-db',
    }),
  })
);
//sıralamaya uymazzsan hata alırsın session bir üstte tanımlıyoruz
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
