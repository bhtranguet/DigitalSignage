const PanelBussiness = require("../bussiness/PanelBussiness");
const ResponseData = require("../entity/ResponseData");
const BaseController = require("./BaseController");

class PanelController extends BaseController {
    constructor() {
        super();
        this.bussiness = new PanelBussiness();
    }
    async getListFrameByPanelID(req, res) {
        var resData = new ResponseData();
        var panel_id = req.query.panel_id;
        try {
            resData.data = await this.bussiness.getListFrameByPanelID(panel_id);
        } catch (error) {
            resData.data = error.message;
            resData.success = false;
        }
        res.json(resData);
    }
}

module.exports = PanelController;