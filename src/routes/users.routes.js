const express = require('express');
//controllers
const usersController = require('./../controllers/users.controller.js');
//Middleeares
const validatiosMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router
  .route('/')
  .get(usersController.findAll)
  .post(validatiosMiddleware.createUserValidation, usersController.createUser);

router
  .route('/:id')
  .get(usersController.findOne)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
module.exports = router;
