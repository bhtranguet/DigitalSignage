var express = require('express');
var router = express.Router();
var multer = require('multer');

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err: err });
    }
    res.json({ success: true, data: url_image});
  })
})

// Biến lưu tên đường dẫn ảnh
var url_image = '';
// Biến lưu tên ảnh
var originName = '';

// cấu hình vị trí lưu file
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload/images_temp');
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now();
    newName = `${uniqueSuffix}-${file.originalname}`;
    url_image = `/upload/images/${newName}`;
    originName = file.originalname;
    callback(null, newName);
  }
})

// Định nghĩa hàm dùng để upload file
var upload = multer({ storage: storage }).single('image');

module.exports = router;
