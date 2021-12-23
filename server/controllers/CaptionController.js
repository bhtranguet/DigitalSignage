const CaptionBussiness = require("../bussiness/CaptionBussiness");
const ResponseData = require("../entity/ResponseData");
const BaseController = require("./BaseController");

class CaptionController extends BaseController {
    constructor() {
        super();
        this.bussiness = new CaptionBussiness();
    }

    async getListCaptionTextByCaptionID(req, res) {
        var resData = new ResponseData();
        var caption_id = req.query.caption_id;
        try {
            resData.data = await this.bussiness.getListCaptionTextByCaptionID(caption_id);
        } catch (error) {
            resData.data = error.message;
            resData.success = false;
        }
        res.json(resData);
    }
    async deleteCaptionText(req, res) {
        var resData = new ResponseData();
        var caption_text_id = req.params['id'];
        try {
            resData.data = await this.bussiness.deleteCaptionText(caption_text_id);
        } catch (error) {
            resData.data = error.message;
            resData.success = false;
        }
        res.json(resData);
    }
    async addCaptionText(req, res) {
        var resData = new ResponseData();
        var entity = req.body;
        try {
            resData.data = await this.bussiness.addCaptionText(entity);
        } catch (error) {
            resData.data = error.message;
            resData.success = false;
        }
        res.json(resData);
    }
}

module.exports = CaptionController;