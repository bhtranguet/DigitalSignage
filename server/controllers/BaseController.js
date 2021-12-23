const BaseBussiness = require("../bussiness/BaseBussiness");
const ResponseData = require("../entity/ResponseData");

class BaseController {
  constructor() {
    this.bussiness = new BaseBussiness();
  }
  /**
   * Lấy về entity theo ID
   * Created by: bhtrang
   * 19/09/2020
  */
  async getByID(req, res) {
    var params = req.params;
    var id = params['id'];
    var resData = new ResponseData();
    try {
      resData.data = await this.bussiness.getByID(id);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
  /**
   * Lấy về danh sách entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async getList(req, res) {
    var resData = new ResponseData();
    try {
      resData.data = await this.bussiness.getList();
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
  /**
   * Cập nhật entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async update(req, res) {
    var resData = new ResponseData();
    var entity = req.body;
    try {
      resData.data = await this.bussiness.update(entity);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
  /**
   * Thêm mới entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async insert(req, res) {
    var resData = new ResponseData();
    var entity = req.body;
    try {
      resData.data = await this.bussiness.insert(entity)
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
  /**
   * Xóa một entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async delete(req, res) {
    var resData = new ResponseData();
    var id = req.params['id'];
    try {
      resData.data = await this.bussiness.delete(id);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    res.json(resData);
  }
}

module.exports = BaseController;