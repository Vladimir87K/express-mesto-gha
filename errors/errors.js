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
  } else if (err.name === 'Error') {
    res.status(404).send({ message: 'Запрашиваемые данные не найдены' });
  } else { checkErrorDefault(err, res); }
};

const errorUrl = (req, res) => {
  res.status(404).send({ message: 'Указан некорректный Url' });
};

module.exports = {
  checkErrorDefault, checkErrorValidation, checkErrorId, errorUrl, checkErrorIncorrectDate,
};
