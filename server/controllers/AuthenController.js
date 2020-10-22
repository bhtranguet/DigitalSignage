var express = require('express');
var router = express.Router();
var webconfig = require('../webconfig');
var jwt = require('jsonwebtoken');
var ActiveDirectory = require('activedirectory');
var ad = new ActiveDirectory(webconfig.ldapConfig);
var Model = require("../model/BaseModel");
const BaseController = require('./BaseController');
const AuthenBussiness = require('../bussiness/AuthenBussiness');
var model = new Model();

class AuthenController extends BaseController {
  constructor() {
    super();
    this.bussiness = new AuthenBussiness();
  }

  /**
   * Controller Verify form Login
   * Created by: bhtrang
   * 22/09/2020
  */
  async login(req, res) {
    var email = req.body.email.includes('@tocotocotea.com') ? req.body.email : req.body.email + '@tocotocotea.com';

    var password = req.body.password;

    var resData = {
      success: true,
      data: null
    }

    try {
      var isAuthen = await this.authen(email, password);
      if (isAuthen) {
        var user = await this.findUserByEmail(email);

        var token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
          data: user['userPrincipalName']
        }, webconfig.privateKey);

        resData.data = {
          token: token,
          user: user.displayName
        };

        res.json(resData);
      } else {
        resData.success = false;
        resData.data = 'Not Authen!'
        res.json(resData);
      }
    } catch (error) {
      resData.success = false;
      resData.data = error;
      res.json(resData);
    }
  }

  /**
   * Controller Verify token
   * Created by: bhtrang
   * 22/09/2020
  */
  async verifyToken(req, res) {
    var token = req.headers.authorization;
    var resData = {
      success: true,
      data: null
    }
    try {
      var decoded = jwt.verify(token, webconfig.privateKey);
      // Lấy ra permisstion theo người dùng
      try {
        let query = `select rp.permission_id, pg.id permission_group_id from user u inner join role r on u.role_id = r.id inner join \`role/permission\` rp on r.id = rp.role_id inner join permission p on rp.permission_id = p.id inner join permission_group pg on p.permission_group_id = pg.id where u.username = ?`;
        var permissions = await model.query(query, [decoded.data]);

        var queryUser = 'select * from user where username = ?';
        var users = await model.query(queryUser, [decoded.data]);

        resData.data = {
          permissions: permissions,
          user: users[0]
        };
      } catch (error) {
        resData.success = false;
        resData.data = JSON.stringify(error);
        res.send(resData);
      }
    } catch (err) {
      resData.success = false;
      resData.data = err
    }
    res.json(resData);
  }

  /**
   * Controller Tìm User theo textSearch
   * Created by: bhtrang
   * 22/09/2020
  */
  async findUsers(req, res) {
    var textSearch = req.query.textSearch;
    var resData = {
      success: true,
      data: null
    }
    try {
      var users = await this.findUsersByTextSearch(textSearch);
      resData.data = users;
    } catch (err) {
      resData.success = false;
      resData.data = err
    }
    res.json(resData);
  }

  /**
   * Hàm dùng authen user
   * Created by: bhtrang
   * 22/09/2020
  */
  authen(email, password) {
    return new Promise((resolve, reject) => {
      ad.authenticate(email, password, function (err, auth) {
        if (err) {
          reject('Error');
          return;
        }

        if (auth) {
          resolve(true)
        }
        else {
          reject(false);
        }
      });
    })
  }

  /**
   * Hàm tìm user theo sAMAccountName
   * Created by: bhtrang
   * 22/09/2020
  */
  findUserByEmail(sAMAccountName) {
    return new Promise((resolve, reject) => {
      ad.findUser(sAMAccountName, function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    })
  }

  /**
   * Hàm tìm người dùng theo textSearch
   * Created by: bhtrang
   * 22/09/2020
  */
  findUsersByTextSearch(textSearch) {
    return new Promise((resolve, reject) => {
      textSearch = textSearch.trim();
      if (textSearch.length === 0) {
        resolve([]);
      }
      var query = `(&(objectCategory=person)(objectClass=user)(|(cn=*${textSearch}*)(sAMAccountName=*${textSearch}*)))`;
      ad.findUsers(query, true, function (err, users) {
        if (err) {
          reject('ERROR: ' + JSON.stringify(err))
          return;
        }

        if ((!users) || (users.length == 0)) {
          reject('No users found.');
        }
        else {
          resolve(users);
        }
      });
    })
  }


}

module.exports = AuthenController;