class WhereCondition {
  constructor(column = null, condition = null, value = null) {
    this.column = column;
    this.condition = condition;
    this.value = value;
  }
}

module.exports = WhereCondition;