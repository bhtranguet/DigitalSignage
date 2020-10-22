var router = require('express').Router();
const AuthenController = require('../controllers/AuthenController');
var controller = new AuthenController();

/**
 * Login
 * Created by: bhtrang
 * 22/09/2020
*/
router.post('/login', controller.login.bind(controller));

/**
 * Verify Token
 * Created by: bhtrang
 * 22/09/2020
*/
router.get('/verify', controller.verifyToken.bind(controller));


/**
 * Search User
 * Created by: bhtrang
 * 22/09/2020
*/
router.get('/findUsers', controller.findUsers.bind(controller));

module.exports = router;