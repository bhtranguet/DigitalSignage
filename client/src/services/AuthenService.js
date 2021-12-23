import Module from "../common/enumeration/Module";
import BaseService from "./BaseService";

class AuthenService extends BaseService {
  constructor() {
    super(Module.Authen);
  }


  presentationLogin(name, password) {
    var formData = {
      name: name,
      password: password
    }
    return this.post(`${this.module.moduleCode}/presentation-login`, formData);
  }

  presentationVerifyToken(token) {
    return this.post(`${this.module.moduleCode}/presentation-verify-token`, token);
  }
}

export default AuthenService;