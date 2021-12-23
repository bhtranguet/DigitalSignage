const MediaBussiness = require("../bussiness/MediaBussiness");
const BaseController = require("./BaseController");
var multer = require('multer');
const ResponseData = require("../entity/ResponseData");

class MeidaController extends BaseController {
  constructor() {
    super();
    this.bussiness = new MediaBussiness();
  }

  /**
   * Controller upload file
   * Created by: bhtrang
   * 08/11/2020
  */
  async uploadFiles(req, res) {
    var resData = new ResponseData();
    var url_image = '';
    var originName = '';
    var listMedia = [];
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './uploads');
      },
      filename: function (req, file, callback) {
        originName = file.originalname;
        const uniqueSuffix = Date.now();
        var newName = `${uniqueSuffix}-${file.originalname}`;
        url_image = `/uploads/${newName}`;
        var media = {
          file_name: originName,
          file_extension: originName.split('.').pop(),
          file_path: url_image
        }
        listMedia.push(media);
        callback(null, newName);
      }
    })

    var upload = multer({ storage: storage }).array('images', 12);

    upload(req, res, async (err) => {
      if (err) {
        resData.success = false;
        resData.error = err;
        return res.json(resData);
      }
      try {
        await this.bussiness.insertMulti(listMedia);
      } catch (error) {
        resData.success = fales;
        resData.error = error.message;
      }
      res.json(resData);
    })
  }
}

module.exports = MeidaController;