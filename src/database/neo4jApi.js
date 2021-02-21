import log from 'fancy-log';
import neo4j from 'neo4j-driver';
import Person from './models/person.model';
require('dotenv').config();

let database = process.env.NEO4J_DATABASE;

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

exports.init = async function init() {
  const session = driver.session();
  await session
    .writeTransaction((tx) => {
      return tx.run('CREATE DATABASE $database IF NOT EXISTS', {
        database: database,
      });
    })
    .then(() => {
      session
        .writeTransaction((tx) => {
          return tx.run(
            'CREATE CONSTRAINT IF NOT EXISTS ON (person:Person) ASSERT person.cpf IS UNIQUE'
          );
        })
        .finally(() => {
          return session.close();
        });
    });
};

console.log(`Database running at ${process.env.NEO4J_URI}`);

exports.createPerson = function createPerson(person) {
  const session = driver.session({ database: database });
  return session
    .writeTransaction((tx) => {
      return tx
        .run(
          'CREATE (person:Person { cpf: $cpf, name: $name, email: $email, telephone: $telephone }) RETURN person',
          person
        )
        .then((result) => {
          if (!result.records) {
            return null;
          }
          const record = result.records[0];

          return new Person(record.get('person').properties);
        });
    })
    .finally(() => {
      return session.close();
    });
};

exports.readPerson = function readPerson(cpf) {
  const session = driver.session({ database });
  return session
    .readTransaction((tx) => {
      return tx
        .run('MATCH (person:Person {cpf: $cpf}) RETURN person', { cpf })
        .then((result) => {
          if (!result.records) {
            return null;
          }
          const record = result.records[0];

          if (!record) {
            return {};
          }

          return new Person(record.get('person').properties);
        });
    })
    .finally(() => {
      return session.close();
    });
};

exports.updatePerson = function updatePerson(person) {
  const session = driver.session({ database });
  return session.writeTransaction((tx) => {
    log(person);
    tx.run(
      'MATCH (person:Person {cpf: $cpf}) ' +
        'SET person.name=$name ' +
        'SET person.email=$email ' +
        'SET person.telephone=$telephone ' +
        'RETURN person',
      person
    )
      .then((result) => {
        if (!result.records) {
          return null;
        }
        const record = result.records[0];

        return new Person(record.get('person').properties);
      })
      .finally(() => {
        return session.close();
      });
  });
};

exports.deletePerson = function deletePerson(cpf) {
  const session = driver.session({ database });
  return session
    .writeTransaction((tx) => {
      tx.run('MATCH (person:Person {cpf: $cpf}) ' + 'DELETE person', { cpf });
    })
    .finally(() => {
      return session.close();
    });
};

exports.getPeople = function getPeople() {
  const session = driver.session({ database });
  return session
    .readTransaction((tx) => tx.run('MATCH (person:Person) RETURN person'))
    .then((result) => {
      if (!result.records) {
        return null;
      }

      return result.records.map((record) => {
        return new Person(record.get('person').properties);
      });
    })
    .finally(() => {
      return session.close();
    });
};
