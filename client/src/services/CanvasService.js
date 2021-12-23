import Module from "../common/enumeration/Module";
import BaseService from "./BaseService";


class CanvasService extends BaseService {
  constructor() {
    super(Module.Canvas);
  }
  /**
   * Lấy danh sách panel của canvas
   * Created by: bhtrang
   * 07/11/2020
  */
  getPanelsOfCanvas(canvasID) {
    return this.post(`${this.module.moduleCode}/getPanelsOfCanvas`, {canvasID: canvasID});
  }
}
export default CanvasService;