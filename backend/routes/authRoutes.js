const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/getuser/:id', authController.getuser);
router.get('/:userId/myproducts', authController.myproducts);
router.get('/:userId/myfavorites', authController.myfavorites);
router.get('/:userId/mycart', authController.mycart);

module.exports = router;
