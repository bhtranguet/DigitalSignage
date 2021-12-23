const FrameBussiness = require("../bussiness/FrameBussiness");
const ResponseData = require("../entity/ResponseData");
const BaseController = require("./BaseController");

class FrameController extends BaseController {
  constructor() {
    super();
    this.bussiness = new FrameBussiness();
  }

  async getListFrameType(req, res) {
    var resData = new ResponseData();
    try {
      resData.data = await this.bussiness.getListFrameType();
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
}

module.exports = FrameController;