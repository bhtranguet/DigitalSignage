var router = require('express').Router();
const CaptionController = require('../controllers/CaptionController');
var controller = new CaptionController();

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
router.delete('/:id([0-9]{1,10})', controller.delete.bind(controller));

// extends

/**
 * Lấy ra caption text
 * Created by: bhtrang
 * 07/11/2020
*/
router.get('/getCaptionText', controller.getListCaptionTextByCaptionID.bind(controller))
/**
 * Delte caption_text
 * Created by: bhtrang
 * 07/11/2020
*/
router.delete('/deleteCaptionText/:id', controller.deleteCaptionText.bind(controller))
/**
 * add caption_text
 * Created by: bhtrang
 * 07/11/2020
*/
router.post('/addCaptionText', controller.addCaptionText.bind(controller))

module.exports = router;