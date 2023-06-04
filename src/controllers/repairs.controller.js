const repairsModel = require('./../models/repairs.model');
exports.findAllRepairs = async (req, res) => {
  const time = req.requestTime;
  const repairs = await repairsModel.findAll({
    where: {
      status: 'pending',
    },
  });
  return res.json({
    requestTime: time,
    results: repairs.length,
    status: 'success',
    message: 'All of  motorcycles to be repaired ..!',
    repairs,
  });
};
exports.createRepairs = async (req, res) => {
  try {
    const { date, status, userId } = req.body;
    const repair = await repairsModel.create({
      date: date,
      status: status,
      userId: userId,
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
    const { id } = req.params;
    const repair = await repairsModel.findOne({
      where: {
        id: id,
        status: 'pending',
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `The product with id: ${id} not found!`,
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Product found a motorcycle pending repair',
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
exports.updateRepairs = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error..!',
    });
  }
};
exports.deleteRepairs = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairsModel.findOne({
      where: {
        id: id,
        status: 'pending',
      },
    });
    if (!repair) {
      res.status(200).json({
        status: 'error',
        message: `Product with id: ${id} not found!`,
      });
    }
    return res.status(200).json({
      status: 'successs',
      message: `The repair ${id} has been successfully removed!`,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
