const repairsController = require('../controllers/repairs.controller');

// middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const protecMiddleware = require('../middlewares/protect.middleware');
const repairMiddleware = require('../middlewares/repairs.middleware');

const { Router } = require('express');
const router = Router();

router.use(protecMiddleware.protect);

// routes
router
  .route('/')
  .get(protecMiddleware.restrictTo('employee'), repairsController.findRepairs)
  .post(
    validationMiddleware.createRepairValidation,
    repairsController.createRepair
  );

router
  .use(protecMiddleware.restrictTo('employee'))
  .use('/:id', repairMiddleware.validRepair)
  .route('/:id')
  .get(repairsController.findRepair)
  .patch(repairsController.updateRepair)
  .delete(repairsController.deleteRepair);

module.exports = router;
