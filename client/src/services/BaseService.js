var webconfig = require('../webconfig');
class BaseService {
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

  // Push Notify tới các users
  pushNotify(notify, users) {
    return this.post('notification', {notify: notify, users: users});
  }
}

module.exports = BaseService;