const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');
const appError = require('../utils/appError');

exports.validLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
    status: 'available',
  });
  if (!user)
    return next(
      new appError(`user with ${email} and ${password} not found...!`)
    );
  req.user = user;
});
