const express = require('express');

const usersController = require('./../controllers/users.controller.js');

const router = express.Router();

router.route('/').get(usersController.findAll).post(usersController.createUser);

router
  .route('/:id')
  .get(usersController.findOne)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
module.exports = router;
