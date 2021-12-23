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
  getByID(id) {
    return this.model.getByID(id);
  }
  /**
   * Lấy về danh sách entity
   * Created by: bhtrang
   * 19/09/2020
  */
  getList() {
    return this.model.getList();
  }
  /**
   * Cập nhật entity
   * Created by: bhtrang
   * 19/09/2020
  */
  update(entity, columns = null) {
    columns = columns ?? Object.keys(entity).filter(key => key !== 'id');
    return this.model.update(entity, columns);
  }
  /**
   * Thêm mới entity
   * Created by: bhtrang
   * 19/09/2020
  */
  insert(entity) {
    return this.model.insert(entity);
  }
  /**
   * Thêm mới multi entity
   * Created by: bhtrang
   * 19/09/2020
  */
  insertMulti(listEntity) {
    return this.model.insertMulti(listEntity);
  }
  /**
   * Xóa một entity
   * Created by: bhtrang
   * 19/09/2020
  */
  delete(id) {
    return this.model.delete(id);
  }
}

module.exports = BaseBussiness;