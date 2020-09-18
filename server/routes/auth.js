const { Router } = require('express');
const router = new Router();

const authenticateController = require('../controllers/auth');
router
  .route('/')
  .post(
    authenticateController.authenticateUser,
    authenticateController.authMiddleware
  );

module.exports = router;