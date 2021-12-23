const Module = require("../enumeration/Module");
const BaseModel = require("./BaseModel");

class FrameModel extends BaseModel {
  constructor() {
    super(Module.Frame);
  }

  getList() {
    let sql = `SELECT f.*, ft.name as frame_type, p.name as panel_name, m.file_name as media_name, c.name canvas_name FROM frame f inner join frame_type ft on f.frame_type_id = ft.id inner join panel p on f.panel_id = p.id inner join media m on f.media_id = m.id inner join canvas c on p.canvas_id = c.id order by c.id, f.id`;
    return this.query(sql);
  }

  getListFrameType() {
    let sql = `SELECT * FROM frame_type`;
    return this.query(sql);
  }
}

module.exports = FrameModel;