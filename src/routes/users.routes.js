const usersController = require('../controllers/users.controller');

// middlewares
const usersMiddleware = require('../middlewares/users.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const protecMiddleware = require('../middlewares/protect.middleware');

const { Router } = require('express');
const router = Router();

router
  .route('/')
  .get(protecMiddleware.protect, usersController.findAllUsers)
  .post(validationMiddleware.createUserValidation, usersController.createUser);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  usersController.login
);

router.use(protecMiddleware.protect);

router
  .route('/:id')
  .get(usersMiddleware.validUser, usersController.findOneUser)
  .patch(
    usersMiddleware.validUser,
    protecMiddleware.protectAccountOwner,
    usersController.updateUser
  )
  .delete(
    usersMiddleware.validUser,
    protecMiddleware.protectAccountOwner,
    usersController.deleteUser
  );

module.exports = router;
