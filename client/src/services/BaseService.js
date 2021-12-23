import webconfig from "../webconfig";

class BaseService {
  constructor(module) {
    this.module = module;
  }
  // phuong thức get
  get(url) {
    var fullPath = `${webconfig.serverApi}/${url}`;
    const response = fetch(fullPath, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      }
    })
    return response;
  }

  // phương thức put
  put(url, data = {}) {
    var fullPath = `${webconfig.serverApi}/${url}`;
    // Default options are marked with *
    const response = fetch(fullPath, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  // phương thức post
  post(url, data = {}) {
    var fullPath = `${webconfig.serverApi}/${url}`;
    // Default options are marked with *
    const response = fetch(fullPath, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  // phương thức delete
  delete(url, data = {}) {
    var fullPath = `${webconfig.serverApi}/${url}`;
    // Default options are marked with *
    const response = fetch(fullPath, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  /**
   * Get tất cả bản ghi
   * Created by: bhtrang
   * 04/11/2020
  */
  getListEntity() {
    return this.get(this.module.moduleCode);
  }

  /**
   * Thêm mới một entity
   * Created by: bhtrang
   * 01/11/2020
  */
  insertEntity(entity) {
    return this.post(this.module.moduleCode, entity);
  }

  /**
   * Xóa một entity
   * Created by: bhtrang
   * 01/11/2020
  */
  deleteEntity(id) {
    return this.delete(`${this.module.moduleCode}/${id}`);
  }

  /**
   * Lấy entity theo id
   * Created by: bhtrang
   * 01/11/2020
  */
  getEntityByID(id) {
    return this.get(`${this.module.moduleCode}/${id}`);
  }

  /**
   * Update một entity
   * Created by: bhtrang
   * 02/11/2020
  */
  updateEntity(entity) {
     return this.put(this.module.moduleCode, entity);
  }

  // Push Notify tới các users
  pushNotify(notify, users) {
    return this.post('notification', {notify: notify, users: users});
  }
}

export default BaseService;