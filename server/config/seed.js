/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Creating RESTful APIs With NodeJS and MongoDB (eg. for an Angular App Backend).',
    info : 'Creating RESTful APIs With NodeJS and MongoDB (eg. for an Angular App Backend).'
  }, {
    name : 'Using Mongoose, ExpressJS and Middleware.',
    info : 'Using Mongoose, ExpressJS and Middleware.'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@lambda-it.ch',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@lambda-it.ch',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});