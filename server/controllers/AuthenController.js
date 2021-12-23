const AuthenBussiness = require("../bussiness/AuthenBussiness");
const ResponseData = require("../entity/ResponseData");
const BaseController = require("./BaseController");

class AuthenController extends BaseController {
  constructor() {
    super();
    this.bussiness = new AuthenBussiness();
  }
  async presentationLogin(req, res) {
    var resData = new ResponseData();
    var data = req.body;
    try {
      var loginResult = await this.bussiness.presentationLogin(data);
      if (loginResult === null) {
        resData.error = 'Tên đăng nhập hoặc mật khẩu không chính xác!';
        resData.success = false;
      } else {
        resData.success = true;
        resData.data = loginResult;
      }
    } catch (error) {
      resData.error = error.message;
      resData.success = false;
    }
    res.json(resData);
  }

  async presentationVerifyToken(req, res) {
    var resData = new ResponseData();
    var token = req.body.token;
    try {
      resData.success = await this.bussiness.presentationVerifyToken(token);
    } catch (error) {
      resData.error = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
}

module.exports = AuthenController;