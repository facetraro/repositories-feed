class User {
  constructor (feedId, name) {
    this.feedId = feedId;
    this.name = name;
  }
}
User.prototype.toString = function perroToString() {
  return this.name;
}
module.exports = User;
