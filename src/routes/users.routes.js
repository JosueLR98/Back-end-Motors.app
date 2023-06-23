const express = require('express');
//controllers
const usersController = require('./../controllers/users.controller.js');
//Middleeares
const userMiddleware = require('../middlewares/validations.middleware.js');
const validMiddleware = require('../middlewares/users.middleware.js');
const protectMiddleware = require('../middlewares/protect.middleware.js');
const router = express.Router();

router
  .route('/')
  .get(protectMiddleware.protect, usersController.findAll)
  .post(userMiddleware.createUserValidation, usersController.createUser);

router.post(
  '/login',
  userMiddleware.loginUserValidation,
  usersController.login
);
router
  .route('/:id')
  .get(validMiddleware.validUser, usersController.findOne)
  .patch(
    validMiddleware.validUser,
    protectMiddleware.protectAccountOwner,
    usersController.updateUser
  )
  .delete(
    validMiddleware.validUser,
    protectMiddleware.protectAccountOwner,
    usersController.deleteUser
  );
module.exports = router;
