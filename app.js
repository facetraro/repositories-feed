const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

const dummyData = require('./helpers/dummy_data');

const allUsers = dummyData.allUsers;
const allRepositories = dummyData.allRepositories;

function getRepositoryByID(id) {
  let ret = null;
  allRepositories.forEach((repository) => {
    if (repository.id == id) {
      ret = repository;
    }
  });
  return ret;
}

let client = redis.createClient();
try {
  client.on('connect', function () {
    console.log('Connected to Redis...');
    console.log('Cleaning all users keys...');
    allUsers.forEach((user) => {
      client.del(user.feedId);
    });
    console.log('Clean Complete');
  });
} catch (error) {
  console.log('Failed to connect Redis');
}

const port = 3000;
const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', function (req, res, next) {
  res.render('feed', {
    users: allUsers,
  });
});

app.get('/repositories', function (req, res, next) {
  res.render('repositories', {
    repositories: allRepositories
  });
});

app.post('/user/feed', function (req, res, next) {
  let id = req.body.id;
  client.lrange(id, 0, -1, (error, data) => {
    if (error) {
      console.log(error);
    }
    if (!data) {
      res.render('feed', {
        error: 'Feed is empty!',
        users: allUsers,
      });
    } else {
      res.render('feed', {
        feed: data,
        users: allUsers,
      });
    }
  });
});

app.post('/repositories', function (req, res, next) {
  const repositoryId = req.body.repositoryId;
  const action = req.body.action;
  const repository = getRepositoryByID(repositoryId);
  const newFeed = `${action} on ${repository.name}`;
  repository.followers.forEach((follower) => {
    client.rpush(follower.feedId, newFeed);
  });
  res.render('repositories', {
    message: newFeed,
    repositories: allRepositories
  });
});

app.listen(port, function () {
  console.log('Server started on port ' + port);
});
