const Module = require("../enumeration/Module");
const BaseModel = require("./BaseModel");

class ScreenModel extends BaseModel {
  constructor() {
    super(Module.Screen);
  }

  getList() {
    let sql = `SELECT s.*, c.name as canvas_name FROM screen s inner join canvas c on s.canvas_id = c.id`;
    return this.query(sql);
  }
}

module.exports = ScreenModel;