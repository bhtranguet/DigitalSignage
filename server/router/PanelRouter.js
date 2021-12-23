const PanelController = require('../controllers/PanelController');

var router = require('express').Router();
var controller = new PanelController();

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
router.get('/:id([0-9]{1,10})', controller.getByID.bind(controller))

/**
 * Xóa Store
 * Created by: bhtrang
 * 21/09/2020
*/
router.delete('/:id([0-9]{1,10})', controller.delete.bind(controller))

// Custom

/**
 * Lấy ra panel của canvas
 * Created by: bhtrang
 * 07/11/2020
*/
router.get('/getFrames', controller.getListFrameByPanelID.bind(controller))
module.exports = router;