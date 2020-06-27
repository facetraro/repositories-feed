const userClass = require('../domain/user');
const repositoryClass = require('../domain/repository');

const firstUser = new userClass(1, 'Andres');
const secondUser = new userClass(2, 'Federico');
const thirdUser = new userClass(3, 'Marcelo');
const fourthUser = new userClass(4, 'Olivia');
const fifthUser = new userClass(5, 'Manuel');
const sixthUser = new userClass(6, 'Magdalena');
const seventhUser = new userClass(7, 'Carlos');
const eighthUser = new userClass(8, 'Sergio');

exports.allUsers = [
  firstUser,
  secondUser,
  thirdUser,
  fourthUser,
  fifthUser,
  sixthUser,
  seventhUser,
  eighthUser
];

const firstRepository = new repositoryClass(
  1,
  'Base de datos no relacionales',
  [firstUser.feedId, secondUser.feedId]
);
const secondRepository = new repositoryClass(2, 'Desarrollo de UI', [
  thirdUser.feedId
]);
exports.allRepositories = [firstRepository, secondRepository];
