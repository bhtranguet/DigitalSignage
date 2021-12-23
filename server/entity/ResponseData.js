class ResponseData {
  constructor(success = true, data = null, error = null) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}

module.exports = ResponseData;