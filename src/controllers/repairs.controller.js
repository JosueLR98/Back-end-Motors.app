const catchAsync = require('../utils/catchAsync');
const repairsModel = require('./../models/repairs.model');

exports.findAllRepairs = async (req, res) => {
  try {
    const repairs = await repairsModel.findAll({
      where: {
        status: 'pending',
      },
    });
    return res.json({
      results: repairs.length,
      status: 'success',
      message: 'All of  motorcycles to be repaired ..!',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
exports.createRepairs = async (req, res) => {
  try {
    const { date, status, userId, description, motorsNumber, Date } = req.body;
    const repair = await repairsModel.create({
      date,
      status,
      userId,
      description,
      motorsNumber,
      Date,
    });
    return res.status(201).json({
      Ok: true,
      message: 'Create an appointment',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
exports.findOneRepairs = async (req, res) => {
  try {
    const { repair } = req;

    return res.status(200).json({
      status: 'success',
      message: 'Product found a motorcycle pending repair..! ✔✨',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
exports.updateRepairs = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const repair = await repairsModel.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `User with id: ${id} not found`,
    });
  }
  await repair.update({ status });
  return res.status(201).json({
    status: 'seccess',
    message: 'Repairs status has been updated',
  });
});

exports.deleteRepairs = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'successs',
    message: `The repair has been successfully removed!`,
    repair,
  });
});
