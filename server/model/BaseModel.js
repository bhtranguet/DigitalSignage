var mysql = require('mysql');
var config = require('../webconfig')

var pool = mysql.createPool(config.dbPoolConfig);

class BaseModel {
  constructor(tableName) {
    this.pool = pool
    this.tableName = tableName;
  }

  /**
   * Hàm get connection từ pool
   * Created by: bhtrang
   * 19/09/2020
  */
  getConnection() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      })
    })
  }


  /**
   * Query dữ liệu
   * Created by: bhtrang
   * 19/09/2020
  */
  async query(queryString, params, connection = null) {
    var conn = connection ?? await this.getConnection();
    return new Promise((resolve, reject) => {
      conn.query(queryString, params, function (err, rows, fields) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
        // Nếu connection truyền từ ngoài vào nghĩa là sẽ liên quan đến transaction. Ta chỉ release connection truyền từ bên ngoài = null.
        if (connection == null) conn.release();
      })
    })
  }

  /**
   * Lấy về dòng đầu tiên trong câu select
   * Created by: bhtrang
   * 19/09/2020
  */
  async queryFirstRow(queryString, params, connection = null) {
    var conn = connection ?? await this.getConnection();
    return new Promise((resolve, reject) => {
      conn.query(queryString, params, function (err, rows, fields) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows[0]);
        }
        if(connection == null) conn.release();
      })
    })
  }

  /**
   * Thực hiện câu lệnh insert, update, delete
   * Created by: bhtrang
   * 19/09/2020
  */
  async execute(queryString, params, connection = null) {
    var conn = connection ?? await this.getConnection();
    return new Promise((resolve, reject) => {
      conn.query(queryString, params, function (err, results, fields) {
        if (err) {
          reject(err.message);
        } else {
          resolve(results);
        }
        if(connection == null) conn.release();
      })
    })
  }


  /**
   * Execute một procedure
   * Created by: bhtrang
   * 19/09/2020
  */
  async executeProcedure(procedureTemplate, arrayParam, connection = null) {
    var conn = connection ?? await this.getConnection();
    return new Promise((resolve, reject) => {
      conn.query(procedureTemplate, arrayParam, function (err, rows, fields) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
        if(connection == null) conn.release();
      })
    })
  }


  /**
   * Thêm nhiều đối tượng
   * Created by: bhtrang
   * 19/09/2020
  */
  async insertMulti(objectArray, tableName = null, connection = null) {
    var conn = connection ?? await this.getConnection();
    tableName = tableName ?? this.tableName;
    
    // Xóa trường ID
    objectArray.forEach(element => {delete element.id});

    return new Promise((resolve, reject) => {
      let keys = Object.keys(objectArray[0]);
      let values = objectArray.map(obj => keys.map(key => obj[key]));
      let sql = 'INSERT INTO ' + tableName + ' (' + keys.join(',') + ') VALUES ?';
      conn.query(sql, [values], function (err, results, fields) {
        if (err) {
          reject(err.message);
        } else {
          resolve(results[0]);
        }
        if(connection == null) conn.release();
      })
    })
  }

  /**
   * Thêm một đối tượng vào bảng
   * Created by: bhtrang
   * 19/09/2020
  */
  insert(object, tableName = null, connection = null) {
    tableName = tableName ?? this.tableName;
    let keys = Object.keys(object);
    let values = keys.map(key => object[key]);
    let sql = 'INSERT INTO ' + tableName + ' (' + keys.join(',') + ') VALUES ?';
    return this.execute(sql, [[values]], connection);
  }

  /**
   * Hàm cập nhật object
   * @param columns Danh sách các column được cập nhật
   * Created by: bhtrang
   * 19/09/2020
  */
  update(object, columns = null, tableName = null, connection = null) {
    tableName = tableName ?? this.tableName;
    if (columns == null) {
      columns = Object.keys(object).filter(key => key !== 'id');
    }
    let params = columns.map(column => object[column]);
    params.push(object.id);
    let sql = `UPDATE ${this.tableName} SET ${columns.map(column => `${column} = ?`).join(',')} WHERE id = ?`;
    return this.execute(sql, params, connection);
  }

  /**
   * Hàm delete object
   * Created by: bhtrang
   * 19/09/2020
  */
  delete(id, tableName = null, connection = null) {
    tableName = tableName ?? this.tableName;
    let sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    return this.execute(sql, id, connection);
  }

  /**
   * Xóa multi
   * Created by: bhtrang
   * 25/09/2020
  */
  deleteMulti(listID, tableName = null, connection = null) {
    tableName = tableName ?? this.tableName;
    let sql = 'delete from point where id in (?)';
    return this.execute(sql, [listID], connection);
  }

  /**
   * Lấy object theo ID
   * Created by: bhtrang
   * 19/09/2020
  */
  getByID(id, columns = null, tableName = null, connection = null) {
    tableName = tableName ?? this.tableName;
    let columnTexts = columns ? columns.join(',') : '*';
    let sql = `SELECT ${columnTexts} FROM ${this.tableName} WHERE id = ?`;
    return this.queryFirstRow(sql, id, connection);
  }
  /**
   * Hàm Get List
   * Created by: bhtrang
   * 21/09/2020
  */
  getList(columns = null, queryOptions = null, tableName = null, connection = null) {
    tableName = tableName ?? this.tableName;
    let columnTexts = columns ? columns.join(',') : '*';
    let queryOptionText = queryOptions ? this.buildQueryOptions(queryOptions) : '';
    let sql = `SELECT ${columnTexts} FROM ${this.tableName} ${queryOptionText}`;
    return this.query(sql, null, connection);
  }

  /**
   * Build mệnh đề where và order by
   * Created by: bhtrang
   * 22/09/2020
  */
  buildQueryOptions(queryOptions) {
    var whereConditions = queryOptions.whereConditions;
    var orderBys = queryOptions.orderBys;
    var where = whereConditions.length > 0 ? 'WHERE ' + whereConditions.map(item => `${item.column} ${item.condition} ${item.value}`).join(',')  : '';
    var orderby = orderBys.length > 0 ? 'ORDER BY ' + orderBys.map(item => `${item.column} ${item.orderType}`).join(',') : '';
    return where + ' ' + orderby;
  }
}

module.exports = BaseModel;