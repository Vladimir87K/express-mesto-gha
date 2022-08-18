const errorUrl = (req, res) => {
  res.status(404).send({ message: 'Указан некорректный Url' });
};

// eslint-disable-next-line consistent-return
const checkErrorsAll = (err, req, res) => {
  console.log('click!!!', err);
  if (err.code === 11000) {
    return res.status(409).send('Указанный Email уже сохранен');
  }

  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};

module.exports = {
  errorUrl, checkErrorsAll,
};
