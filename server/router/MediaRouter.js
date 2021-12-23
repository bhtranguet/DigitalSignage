var router = require('express').Router();
const MeidaController = require('../controllers/MediaController');
var controller = new MeidaController();

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
router.get('/:id', controller.getByID.bind(controller))

/**
 * Xóa
 * Created by: bhtrang
 * 21/09/2020
*/
router.delete('/:id', controller.delete.bind(controller))

// Custom

/**
 * Thực hiện upload files
 * Created by: bhtrang
 * 08/11/2020
*/
router.post('/upload', controller.uploadFiles.bind(controller))


module.exports = router;