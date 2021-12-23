import Module from "../common/enumeration/Module";
import BaseService from "./BaseService";


class CaptionService extends BaseService {
  constructor() {
    super(Module.Caption);
  }

  deleteCaptionText(id) {
    return this.delete(`${this.module.moduleCode}/deleteCaptionText/${id}`);
  }
  addCaptionText(captionText) {
    return this.post(`${this.module.moduleCode}/addCaptionText`, captionText);
  }
}
export default CaptionService;