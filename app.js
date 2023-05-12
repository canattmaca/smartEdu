const express = require('express');
const app = express();
const port = 3000;

//Template Engine
app.set('view engine', 'ejs');

//MiddleWares
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
});
app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
});
app.get('/contact', (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
});
app.get('/courses', (req, res) => {
  res.status(200).render('contact', {
    page_name: 'courses',
  });
});
app.get('/doashboard', (req, res) => {
  res.status(200).render('contact', {
    page_name: 'doashboard',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
