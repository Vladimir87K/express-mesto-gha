const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const cardsRoutes = require('./routes/cardsRouters');
const errorUrl = require('./routes/errorUrl');

// "_id": "62f005f83f02648e632d8647"
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
  req.user = {
    _id: '62f005f83f02648e632d8647', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

// app.use('/users', () => console.log('Click!!!'));
app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('/*', errorUrl);

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
