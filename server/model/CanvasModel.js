const Module = require("../enumeration/Module");
const BaseModel = require("./BaseModel");

class CanvasModel extends BaseModel {
  constructor() {
    super(Module.Canvas);
  }

  /**
   * Lấy danh sách panel của canvas
   * Created by: bhtrang
   * 07/11/2020
  */
  getPanelsOfCanvas(canvasID) {
    var sql = "SELECT * FROM panel WHERE canvas_id = ?";
    var params = [canvasID];
    return this.query(sql, params);
  }
}

module.exports = CanvasModel;