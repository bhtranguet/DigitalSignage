const AuthenModel = require("../model/AuthenModel");
const BaseBussiness = require("./BaseBussiness");

class AuthenBussiness extends BaseBussiness {
  constructor() {
    super();
    this.model = new AuthenModel();
  }
}

module.exports = AuthenBussiness;