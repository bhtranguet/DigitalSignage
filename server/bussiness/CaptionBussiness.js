const CaptionModel = require("../model/CaptionModel");
const BaseBussiness = require("./BaseBussiness");

class CaptionBussiness extends BaseBussiness{
    constructor() {
        super();
        this.model = new CaptionModel();
    }
    getListCaptionTextByCaptionID(caption_id) {
        return this.model.getListCaptionTextByCaptionID(caption_id);
    }
    deleteCaptionText(caption_text_id) {
        return this.model.deleteCaptionText(caption_text_id);
    }
    addCaptionText(captionText) {
        return this.model.addCaptionText(captionText);
    }
}

module.exports = CaptionBussiness;