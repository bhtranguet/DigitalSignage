const AuthenModel = require("../model/AuthenModel");
const BaseBussiness = require("./BaseBussiness");
const webConfig = require('../webconfig');
var jwt = require('jsonwebtoken');

class AuthenBussiness extends BaseBussiness {
  constructor() {
    super();
    this.model = new AuthenModel();
  }

  async presentationLogin(data) {
    var result = {};
    var screen = await this.model.getScreenByLoginData(data);
    if (screen) {
      var token = jwt.sign({ name: screen.name, password: screen.password }, webConfig.privateKey);
      result.screen = screen;
      result.token = token;
    } else {
      result = null;
    }
    return result;
  }

  async presentationVerifyToken(token) {
    var result = false;
    try {
      var decoded = jwt.verify(token, webConfig.privateKey);
      var screen = await this.model.getScreenByLoginData(decoded);
      result = screen ? true : false;
    } catch (err) {
      result = false;
    }
    return result;
  }
}

module.exports = AuthenBussiness;