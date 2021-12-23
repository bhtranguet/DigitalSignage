var router = require('express').Router();
var ScreenController = require('../controllers/ScreenController');
var controller = new ScreenController();

/**
 * Thêm Store
 * Created by: bhtrang
 * 21/09/2020
*/
router.post('/', controller.insert.bind(controller))

/**
 * Cập nhật Store
 * Created by: bhtrang
 * 21/09/2020
*/
router.put('/', controller.update.bind(controller))

/**
 * Lấy danh sách
 * Created by: bhtrang
 * 21/09/2020
*/
router.get('/', controller.getList.bind(controller))


/**
 * Lấy Store theo ID
 * Created by: bhtrang
 * 21/09/2020
*/
router.get('/:id', controller.getByID.bind(controller))

/**
 * Xóa Store
 * Created by: bhtrang
 * 21/09/2020
*/
router.delete('/:id', controller.delete.bind(controller))

module.exports = router;