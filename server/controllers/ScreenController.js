const ScreenBussiness = require("../bussiness/ScreenBussiness");
const BaseController = require("./BaseController");

class ScreenController extends BaseController {
    constructor() {
        super();
        this.bussiness = new ScreenBussiness();
    }
}

module.exports = ScreenController;