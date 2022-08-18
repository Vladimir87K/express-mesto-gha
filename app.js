const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRoutes = require('./routes/usersRoutes');
const cardsRoutes = require('./routes/cardsRouters');
const auth = require('./middlewares/auth');
const { errorUrl, checkErrorsAll } = require('./errors/errors');
const { login, createUser } = require('./controllers/usersControllers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
  .then(() => console.log('Connected db'))
  .catch((e) => console.log(e));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.post('/signup', createUser);
app.post('/signin', login);
app.use('/', auth, usersRoutes);
app.use('/', auth, cardsRoutes);
app.use('/*', errorUrl);

app.use(errors());

app.use((err, req, res, next) => {
  checkErrorsAll(err, req, res);
  next();
});

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
