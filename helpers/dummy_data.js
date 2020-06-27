const userClass = require('../domain/user');
const repositoryClass = require('../domain/repository');

const firstUser = new userClass(1, 'Andres');
const secondUser = new userClass(2, 'Federico');
const thirdUser = new userClass(3, 'Marcelo');
exports.allUsers = [firstUser, secondUser, thirdUser];

const firstRepository = new repositoryClass(
  1,
  'Base de datos no relacionales',
  [firstUser.feedId, secondUser.feedId]
);
const secondRepository = new repositoryClass(2, 'Desarrollo de UI', [
  thirdUser.feedId
]);
exports.allRepositories = [firstRepository, secondRepository];