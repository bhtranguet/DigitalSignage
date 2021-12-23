var router = require('express').Router();
const AuthenController = require('../controllers/AuthenController');
var controller = new AuthenController();

/**
 * Login
 * Created by: bhtrang
 * 21/09/2020
*/
router.post('/presentation-login', controller.presentationLogin.bind(controller));

router.post('/presentation-verify-token', controller.presentationVerifyToken.bind(controller));

module.exports = router;