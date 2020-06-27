class User {
  constructor (feedId, name) {
    this.feedId = feedId;
    this.name = name;
    this.feedSize = 0;
  }
}
User.prototype.toString = function toString() {
  return this.name;
}
module.exports = User;
