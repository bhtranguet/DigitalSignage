import Module from "../common/enumeration/Module";
import BaseService from "./BaseService";


class FrameService extends BaseService {
  constructor() {
    super(Module.Frame);
  }

  getListFrameType() {
    return this.get(`${this.module.moduleCode}/getListFrameType`);
  }
}
export default FrameService;