import Module from "../common/enumeration/Module";
import BaseService from "./BaseService";

class PresentationService extends BaseService{
  constructor() {
    super(Module.Presentation);
  }
  getScreenShowData(screen_id) {
    return this.get(`${this.module.moduleCode}/screen-show/${screen_id}`);
  }
}

export default PresentationService;