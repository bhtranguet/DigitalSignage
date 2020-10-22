const ResponseData = require("../entity/ResponseData");
const BaseModel = require("../model/BaseModel");

class BaseBussiness {
  constructor() {
    this.model = new BaseModel();
  }
  /**
   * Lấy về entity theo ID
   * Created by: bhtrang
   * 19/09/2020
  */
  async getByID(id) {
    var resData = new ResponseData();
    try {
      resData.data = await this.model.getByID(id);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    return resData;
  }
  /**
   * Lấy về danh sách entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async getList() {
    var resData = new ResponseData();
    try {
      resData.data = await this.model.getList();
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    return resData;
  }
  /**
   * Cập nhật entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async update(entity, columns = null) {
    var resData = new ResponseData();
    columns = columns ?? Object.keys(entity).filter(key => key !== 'id');
    try {
      resData.data = await this.model.update(entity, columns);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    return resData;
  }
  /**
   * Thêm mới entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async insert(entity) {
    var resData = new ResponseData();
    try {
      resData.data = await this.model.insert(entity);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    return resData;
  }
  /**
   * Xóa một entity
   * Created by: bhtrang
   * 19/09/2020
  */
  async delete(id) {
    var resData = new ResponseData();
    try {
      resData.data = await this.model.delete(id);
    } catch (error) {
      resData.data = error.message;
      resData.success = false;
    }
    return resData;
  }
}

module.exports = BaseBussiness;