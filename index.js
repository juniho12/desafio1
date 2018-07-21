const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();
nunjucks.configure('views', {
 autoescape: true,
    express: app,
});
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

const checkMiddleware = (req, res, next) => {
  const { nome, data } = req.query;
  return !nome || !data ? res.redirect('/') : next();
};

app.get('/', (req, res) =>{
  res.render('main');
});

app.post('/check', (req, res) => {
  const { nome, data } = req.body;
  const idade = moment().diff(data, 'years', true);

 if (idade > 18) {
    res.redirect(`/major?name=${nome}&data=${data}`);
  } else {
    res.redirect(`/minor?name=${nome}&data=${data}`);
  }
});

app.get('/major', checkMiddleware, (req, res) => {
  const { nome } = req.query;
  res.render('major', { nome });
  });

app.get('/minor', checkMiddleware, (req, res) => {
const{ nome } = req.query;
res.render('minor', { nome });
});

app.listen(3000);
