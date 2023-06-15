const userModel = require('../models/users.model');
exports.findAll = async (req, res) => {
  const time = req.requestTime;
  const users = await userModel.findAll({
    where: {
      status: 'Available',
    },
  });
  return res.status(200).json({
    requestTime: time,
    result: users.length,
    status: 'success..!',
    message: 'Find list of users in the database',
    users,
  });
};
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;
    const user = await userModel.create({
      name: name,
      email: email,
      password: password,
      role: role,
      status: status,
    });
    return res.status(201).json({
      OK: true,
      message: 'User has been created!',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong...!',
    });
  }
};
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({
      where: {
        id: id,
        status: 'Available',
      },
    });
    if (user === null) {
      return res.status(404).json({
        status: 'error',
        message: `The user with id: ${id} not found !`,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'User found !',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error..!',
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await userModel.findOne({
      where: {
        id: id,
        status: 'Available',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      });
    }
    await user.update({ name, email });
    return res.status(200).json({
      status: 'seccess',
      message: `User name and email has been updated`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error..!',
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({
      where: {
        id: id,
        status: 'Available',
      },
    });
    if (!user) {
      res.status(200).json({
        status: 'error',
        message: `Product with id: ${id} not found!`,
      });
    }
    return res.status(200).json({
      status: 'successs',
      message: 'The user has been successfully removed!',
    });
    await user.update({ status: 'Complete' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
}; //TODO: olvide algo
