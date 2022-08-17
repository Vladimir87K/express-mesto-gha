const errorUrl = (req, res) => {
  res.status(404).send({ message: 'Указан некорректный Url' });
};

const checkErrorsAll = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};

module.exports = {
  errorUrl, checkErrorsAll,
};
