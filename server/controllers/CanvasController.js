const CanvasBussiness = require("../bussiness/CanvasBussiness");
const ResponseData = require("../entity/ResponseData");
const BaseController = require("./BaseController");

class CanvasController extends BaseController {
  constructor() {
    super();
    this.bussiness = new CanvasBussiness();
  }

  /**
   * Lấy danh sách panel thuộc canvas
   * Created by: bhtrang
   * 07/11/2020
  */
  async getPanels(req, res) {
    var resData = new ResponseData();
    var canvasID = req.query.id;
    try {
      resData.data = await this.bussiness.getPanelsOfCanvas(canvasID);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
}

module.exports = CanvasController;