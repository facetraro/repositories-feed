class Repository {
  constructor(id, name, owner, followers, favorites) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.followers = followers;
    this.favorites = favorites;
  }
}
Repository.prototype.getInterestedUsers = function getInterestedUsers() {
  const allInterested = [this.owner];
  this.followers.forEach((follower) => {
    allInterested.push(follower);
  });
  this.favorites.forEach((favorite) => {
    allInterested.push(favorite);
  });
  return allInterested;
};
module.exports = Repository;
