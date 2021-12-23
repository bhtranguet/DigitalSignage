var router = require('express').Router();
const PresentationController = require('../controllers/PresentationController');
var controller = new PresentationController();


router.get('/screen-show/:id', controller.getScreenShowData.bind(controller));

module.exports = router;