const BaseBussiness = require("../bussiness/BaseBussiness");

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
    var resData = await this.bussiness.getByID(id);
    res.json(resData);
  }
  /**
   * Lấy về danh sách entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async getList(req, res) {
    var resData = await this.bussiness.getList();
    res.json(resData);
  }
  /**
   * Cập nhật entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async update(req, res) {
    var entity = req.body;
    var resData = await this.bussiness.update(entity)
    res.json(resData);
  }
  /**
   * Thêm mới entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async insert(req, res) {
    var entity = req.body;
    var resData = await this.bussiness.insert(entity)
    res.json(resData);
  }
  /**
   * Xóa một entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async delete(req, res) {
    var id = req.params['id'];
    var resData = await this.bussiness.delete(id);
    res.json(resData);
  }
}

module.exports = BaseController;