var router = require('express').Router();
const FrameController = require('../controllers/FrameController');
var controller = new FrameController();

/**
 * Thêm
 * Created by: bhtrang
 * 21/09/2020
*/
router.post('/', controller.insert.bind(controller))

/**
 * Cập nhật
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
 * Lấy theo ID
 * Created by: bhtrang
 * 21/09/2020
*/
router.get('/:id([0-9]{1,10})', controller.getByID.bind(controller))

/**
 * Xóa
 * Created by: bhtrang
 * 21/09/2020
*/
router.delete('/:id', controller.delete.bind(controller))

// Custom

/**
 * Lấy danh sách frame type
 * Created by: bhtrang
 * 08/11/2020
*/
router.get('/getListFrameType', controller.getListFrameType.bind(controller))

module.exports = router;