import Module from "../common/enumeration/Module";
import webconfig from "../webconfig";
import BaseService from "./BaseService";


class MediaService extends BaseService {
  constructor() {
    super(Module.Media);
  }

  uploadMedia(formData) {
    var fullPath = `${webconfig.serverApi}/media/upload`;
    const response = fetch(fullPath, {
      method: 'POST',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      body: formData
    });
    return response;
  }
}
export default MediaService;