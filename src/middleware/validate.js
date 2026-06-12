const AppError = require('../utils/AppError');

module.exports = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.parseAsync(req.body);
    req.body = validated;
    next();
  } catch (error) {
    const message = error.errors?.[0]?.message || error.message;
    next(new AppError(message, 400));
  }
};
