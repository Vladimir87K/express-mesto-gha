const NotFoundError = require('./NotFoundError');

// eslint-disable-next-line no-unused-vars
const errorUrl = (req, res) => {
  throw new NotFoundError('Указан некорректный Url');
};

// eslint-disable-next-line consistent-return
const checkErrorsAll = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
};

module.exports = {
  errorUrl, checkErrorsAll,
};
