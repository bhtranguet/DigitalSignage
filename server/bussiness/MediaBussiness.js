const MediaModel = require("../model/MediaModel");
const BaseBussiness = require("./BaseBussiness");
var path = require("path");
var fs = require('fs');

class MediaBussiness extends BaseBussiness {
  constructor() {
    super();
    this.model = new MediaModel();
  }

  async delete(id) {
    try {
      var media = await this.getByID(id);
      var physicalPath = path.join(process.cwd(), media.file_path);
      fs.unlinkSync(physicalPath)
      return this.model.delete(id);
    } catch(err) {
      throw err;
    }
  }
}

module.exports = MediaBussiness;