class ResponseData {
  constructor(success = true, data = null) {
    this.success = success;
    this.data = data;
  }
}

module.exports = ResponseData;