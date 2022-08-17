const checkErrorDefault = (err, res) => {
  res.status(500).send({ message: `Произошла ошибка: ${err}` });
};

const checkErrorIncorrectDate = (res) => {
  res.status(400).send({ message: 'Переданы некорректные данные' });
};

const checkErrorValidation = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: `Произошла ошибка: ${err}` });
  } else {
    checkErrorDefault(err, res);
  }
};

const checkErrorId = (err, res) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: `Использовано некорректное _id: ${err}` });
  } else if (err.message === 'NotFound') {
    res.status(404).send({ message: 'Запрашиваемые данные не найдены' });
  } else { checkErrorDefault(err, res); }
};

const errorUrl = (req, res) => {
  res.status(404).send({ message: 'Указан некорректный Url' });
};

const checkErrorsAll = (err, req, res) => {
  if (err.message === 'Нет пользователя с таким id') {
    res.status(401).send({ message: 'Необходима авторизация' });
  } else if (err.message === 'CastError') {
    res.status(400).send({ message: `Использовано некорректное _id: ${err}` });
  } else if (err.message === 'NotFound') {
    res.status(404).send({ message: 'Запрашиваемые данные не найдены' });
  } else if (err.message === 'Данные не введены') {
    res.status(400).send({ message: `Произошла ошибка: ${err}` });
  } else if (err.message === 'Неправильные почта или пароль') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  } else if (err.code === 11000) {
    res.status(409).send({ message: 'Данный email уже сохранен' });
  } else if (err.message === 'Нет прав на удаление карточки') {
    res.status(403).send({ message: err.message });
  } else {
    res.status(500).send({ message: `Произошла ошибка: ${err}` });
  }
};

module.exports = {
  // eslint-disable-next-line max-len
  checkErrorDefault, checkErrorValidation, checkErrorId, errorUrl, checkErrorIncorrectDate, checkErrorsAll,
};
