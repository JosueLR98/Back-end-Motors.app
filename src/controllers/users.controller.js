const userModel = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

//

exports.findAll = async (req, res) => {
  const users = await userModel.findAll({
    where: {
      status: 'available',
    },
  });
  return res.status(200).json({
    result: users.length,
    status: 'success..!',
    message: 'Find list of users in the database',
    users,
  });
};
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: role,
      status: status,
    });
    const token = await generateJWT(user.id);

    return res.status(201).json({
      OK: true,
      message: 'User has been created..!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong...!🎈',
    });
  }
};
exports.findOne = catchAsync(async (req, res, next) => {
  const { user } = req;
  return res.status(200).json({
    status: 'success',
    message: 'User found..!',
    user,
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;
  await user.update({ name, email });
  return res.status(200).json({
    status: 'seccess',
    message: `User name and email has been updated..👍`,
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: 'Complete' });
  return res.status(200).json({
    status: 'successs',
    message: 'The user has been successfully removed!',
    user,
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
      // Asegúrate de incluir la condición de búsqueda para la contraseña
    },
  });
  if (!user) {
    return next(new AppError(`User with email: ${email} not found..😮`, 404));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Incorrect email or password...😒`, 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});
