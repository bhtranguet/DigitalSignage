const ScreenModel = require("../model/ScreenModel");
const BaseBussiness = require("./BaseBussiness");

class ScreenBussiness extends BaseBussiness{
    constructor() {
        super();
        this.model = new ScreenModel();
    }
}

module.exports = ScreenBussiness;