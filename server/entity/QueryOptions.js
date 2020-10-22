class QueryOptions {
  constructor(whereConditions = [], orderBys = []) {
    this.whereConditions = whereConditions;
    this.orderBys = orderBys;
  }
}

module.exports = QueryOptions;