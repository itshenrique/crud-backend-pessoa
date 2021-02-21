'use strict';

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _neo4jDriver = require('neo4j-driver');

var _neo4jDriver2 = _interopRequireDefault(_neo4jDriver);

var _person = require('./models/person.model');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var database = process.env.NEO4J_DATABASE;

var driver = _neo4jDriver2.default.driver(process.env.NEO4J_URI, _neo4jDriver2.default.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));

exports.init = async function init() {
  var session = driver.session();
  await session.writeTransaction(function (tx) {
    return tx.run('CREATE DATABASE $database IF NOT EXISTS', {
      database: database
    });
  }).then(function () {
    session.writeTransaction(function (tx) {
      return tx.run('CREATE CONSTRAINT IF NOT EXISTS ON (person:Person) ASSERT person.cpf IS UNIQUE');
    }).finally(function () {
      return session.close();
    });
  });
};

console.log('Database running at ' + process.env.NEO4J_URI);

exports.createPerson = function createPerson(person) {
  var session = driver.session({ database: database });
  return session.writeTransaction(function (tx) {
    return tx.run('CREATE (person:Person { cpf: $cpf, name: $name, email: $email, telephone: $telephone }) RETURN person', person).then(function (result) {
      if (!result.records) {
        return null;
      }
      var record = result.records[0];

      return new _person2.default(record.get('person').properties);
    });
  }).finally(function () {
    return session.close();
  });
};

exports.readPerson = function readPerson(cpf) {
  var session = driver.session({ database: database });
  return session.readTransaction(function (tx) {
    return tx.run('MATCH (person:Person {cpf: $cpf}) RETURN person', { cpf: cpf }).then(function (result) {
      if (!result.records) {
        return null;
      }
      var record = result.records[0];

      if (!record) {
        return {};
      }

      return new _person2.default(record.get('person').properties);
    });
  }).finally(function () {
    return session.close();
  });
};

exports.updatePerson = function updatePerson(person) {
  var session = driver.session({ database: database });
  return session.writeTransaction(function (tx) {
    (0, _fancyLog2.default)(person);
    tx.run('MATCH (person:Person {cpf: $cpf}) ' + 'SET person.name=$name ' + 'SET person.email=$email ' + 'SET person.telephone=$telephone ' + 'RETURN person', person).then(function (result) {
      if (!result.records) {
        return null;
      }
      var record = result.records[0];

      return new _person2.default(record.get('person').properties);
    }).finally(function () {
      return session.close();
    });
  });
};

exports.deletePerson = function deletePerson(cpf) {
  var session = driver.session({ database: database });
  return session.writeTransaction(function (tx) {
    tx.run('MATCH (person:Person {cpf: $cpf}) ' + 'DELETE person', { cpf: cpf });
  }).finally(function () {
    return session.close();
  });
};

exports.getPeople = function getPeople() {
  var session = driver.session({ database: database });
  return session.readTransaction(function (tx) {
    return tx.run('MATCH (person:Person) RETURN person');
  }).then(function (result) {
    if (!result.records) {
      return null;
    }

    return result.records.map(function (record) {
      return new _person2.default(record.get('person').properties);
    });
  }).finally(function () {
    return session.close();
  });
};