const PresentationModel = require("../model/PresentationModel");
const BaseBussiness = require("./BaseBussiness");

class PresentaionBussiness extends BaseBussiness{
    constructor() {
        super();
        this.model = new PresentationModel();
    }

    getScreenShowData(screen_id) {
        return this.model.getScreenShowData(screen_id);
    }
}

module.exports = PresentaionBussiness;