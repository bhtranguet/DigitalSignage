const Module = require("../enumeration/Module");
const BaseModel = require("./BaseModel");

class PresentationModel extends BaseModel {
  constructor() {
    super(Module.Presentation);
  }
  async getScreenShowData(screen_id) {
    var canvas = await this.queryFirstRow("select c.* from screen s inner join canvas c on s.canvas_id = c.id where s.id = ?", [screen_id]);
    var listPanel = await this.query('select p.* from screen s inner join canvas c on s.canvas_id = c.id inner join panel p on c.id = p.canvas_id where s.id = ?', [screen_id]);
    var listFrame = await this.query('select f.*, m.file_path as media_url from screen s inner join canvas c on s.canvas_id = c.id inner join panel p on c.id = p.canvas_id inner join frame f on f.panel_id = p.id inner join media m on f.media_id = m.id where s.id = ?', [screen_id]);
    var listCaption = await this.query('select *, TIME_TO_SEC(time_start) time_start_sec, TIME_TO_SEC(time_end) time_end_sec from caption where screen_id = ?', [screen_id]); 
    var listCaptionText = await this.query('select ct.*, c.id from caption c inner join caption_text ct on c.id = ct.caption_id where c.screen_id = ?', [screen_id]); 
    return {
      canvas: canvas,
      listPanel :listPanel,
      listFrame: listFrame,
      listCaption: listCaption,
      listCaptionText: listCaptionText
    }
  }
}
module.exports = PresentationModel;