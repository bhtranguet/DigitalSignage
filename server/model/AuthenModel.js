const Module = require("../enumeration/Module");
const BaseModel = require("./BaseModel");

class AuthenModel extends BaseModel {
  constructor() {
    super(Module.Authen);
  }

  /**
   * Lấy screen theo data login
   * Created by: bhtrang
   * 03/11/2020
  */
  async getScreenByLoginData(data) {
    return this.queryFirstRow('SELECT * FROM screen WHERE name = ? and password = ?', [data.name, data.password]);
  }
}

module.exports = AuthenModel;