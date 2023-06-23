const express = require('express');
const repairsController = require('./../controllers/repairs.controller');

const repairMiddleware = require('../middlewares/repairs.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const protectMiddleware = require('../middlewares/protect.middleware');

const router = express.Router();
{
  /*const validProduct = (req, res, next) => {
  const { name } = req.body.name;
  const { email } = req.body.email;
  const { password } = req.body.password;
  if (!name) {
    res.status(400).json({
      message: " The name is requirred",
    });
  }
  if (!email) {
    res.status(400).json({
      message: " The email is requirred",
    });
  }
  if (!password) {
    res.status(400).json({
      message: " The password is requirred",
    });
  }
  next();
};*/
}
router
  .route('/')
  .get(
    protectMiddleware.protect,
    protectMiddleware.restrictTo('employee'),
    repairsController.findAllRepairs
  )
  .post(
    validationMiddleware.createRepairsValidation,
    protectMiddleware.protect,
    repairsController.createRepairs
  );

router
  .use(protectMiddleware.protect)
  .use(protectMiddleware.restrictTo('employee'))
  .use('/:id', repairMiddleware.validRepairs)
  .route('/:id')
  .get(repairsController.findOneRepairs)
  .patch(repairsController.updateRepairs)
  .delete(repairsController.deleteRepairs);

module.exports = router;
