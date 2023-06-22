const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const ModelName = require('../models/users.model');

exports.protect = catchAsync(async (req, res, next) => {
  //1. extraer el token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //2. validar si existe el token
  if (!token) {
    return next(
      new AppError('You are not logged in!, Please log in to get access', 401)
    );
  }
  //3. decodificar el jwt
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  console.log(decoded);
  //4. buscar el usuario y validar que exista
  const user = await ModelName.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });
  if (!user) {
    return next(
      new AppError('The owner of this token it not longer available', 401)
    );
  }
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          'User recently changed password!, please login again.',
          401
        )
      );
    }
  }
  req.sessionUser = user;
  next();
});
