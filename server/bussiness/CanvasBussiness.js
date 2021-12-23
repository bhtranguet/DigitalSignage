const CanvasModel = require("../model/CanvasModel");
const BaseBussiness = require("./BaseBussiness");

class CanvasBussiness extends BaseBussiness{
    constructor() {
        super();
        this.model = new CanvasModel();
    }

    /**
     * Lấy danh sách panel của canvas
     * Created by: bhtrang
     * 07/11/2020
    */
    getPanelsOfCanvas(canvasID) {
        return this.model.getPanelsOfCanvas(canvasID);
    }
}

module.exports = CanvasBussiness;