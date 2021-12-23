const PanelModel = require("../model/PanelModel");
const BaseBussiness = require("./BaseBussiness");

class PanelBussiness extends BaseBussiness{
    constructor() {
        super();
        this.model = new PanelModel();
    }

    getListFrameByPanelID(panel_id) {
        return this.model.getListFrameByPanelID(panel_id);
    }
}

module.exports = PanelBussiness;