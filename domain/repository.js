class Repository {
  constructor (id, name, owner, followers, favorites) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.followers = followers;
    this.favorites = favorites;
  }
}
module.exports = Repository;
