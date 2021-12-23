const PresentaionBussiness = require("../bussiness/PresentaionBussiness");
const ResponseData = require("../entity/ResponseData");
const BaseController = require("./BaseController");

class PresentationController extends BaseController {
  constructor() {
    super();
    this.bussiness = new PresentaionBussiness();
  }
  async getScreenShowData(req, res) {
    var resData = new ResponseData();
    var screen_id = parseInt(req.params['id']);
    try {
      resData.data = await this.bussiness.getScreenShowData(screen_id);
    } catch (error) {
      resData.error = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
}

module.exports = PresentationController;