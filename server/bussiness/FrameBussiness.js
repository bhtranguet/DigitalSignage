const FrameModel = require("../model/FrameModel");
const BaseBussiness = require("./BaseBussiness");

class FrameBussiness extends BaseBussiness {
  constructor() {
    super();
    this.model = new FrameModel();
  }
  
  getListFrameType() {
    return this.model.getListFrameType();
  }
}

module.exports = FrameBussiness;