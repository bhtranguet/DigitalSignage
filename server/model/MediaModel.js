const Module = require("../enumeration/Module");
const BaseModel = require("./BaseModel");

class MediaModel extends BaseModel {
  constructor() {
    super(Module.Media);
  }
}

module.exports = MediaModel;