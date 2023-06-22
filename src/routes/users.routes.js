const express = require('express');
//controllers
const usersController = require('./../controllers/users.controller.js');
//Middleeares
const userMiddleware = require('../middlewares/validations.middleware.js');
const validMiddleware = require('../middlewares/users.middleware.js');
const validLogin = require('../middlewares/login.middleware.js');
const router = express.Router();

router
  .route('/')
  .get(usersController.findAll)
  .post(userMiddleware.createUserValidation, usersController.createUser);

router.post('/login', usersController.login);
router
  .route('/:id')
  .get(validMiddleware.validUser, usersController.findOne)
  .patch(validMiddleware.validUser, usersController.updateUser)
  .delete(validMiddleware.validUser, usersController.deleteUser);
module.exports = router;
