const Repairs = require('../models/repairs.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.validRepairs = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return next(new AppError(`User with id: ${id} not found..⚡!!`, 404));
  }
  req.repair = repair;
  next();
});
