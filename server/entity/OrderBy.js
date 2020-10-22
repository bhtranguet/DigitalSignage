class OrderBy {
  constructor(column = null, orderType = null) {
    this.column = column;
    this.orderType = orderType;
  }
}

module.exports = OrderBy;