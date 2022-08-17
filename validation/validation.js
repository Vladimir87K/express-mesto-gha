const { celebrate, Joi } = require('celebrate');

module.exports.userValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().email(),
    email: Joi.string().email().required().pattern(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i),
    password: Joi.string().required(),
  }).unknown(true);
  return schema.validate(data);
};
