const Module = require("../enumeration/Module");
const BaseModel = require("./BaseModel");

class CaptionModel extends BaseModel {
  constructor() {
    super(Module.Caption);
  }

  getListCaptionTextByCaptionID(caption_id) {
    var sql = "SELECT * FROM caption_text WHERE caption_id = ?";
    var params = [caption_id];
    return this.query(sql, params);
  }

  deleteCaptionText(caption_text_id) {
    var sql = "delete from caption_text where id=?";
    var params = [caption_text_id];
    return this.execute(sql, params);
  }

  addCaptionText(captionText) {
    return this.insert(captionText, 'caption_text');
  }
}

module.exports = CaptionModel;