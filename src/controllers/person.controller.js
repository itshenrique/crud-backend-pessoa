import db from '../database/neo4jApi';
import log from 'fancy-log';
import Person from '../database/models/person.model';

/**
 *
 *
 * @class PersonController
 */
class PersonController {
  /**
   * create a person record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof PersonController
   */
  static async create(req, res, next) {
    log('create' + req.body);
    const person = new Person(req.body);

    if (
      person.cpf == undefined ||
      person.name == undefined ||
      person.email == undefined ||
      person.telephone == undefined
    ) {
      return res.status(400).json({ message: 'Bad request!' });
    }

    await db
      .createPerson(person)
      .then((person) => {
        return res.status(200).json(person);
      })
      .catch((e) => {
        log(e);
        return res.status(500).json({ message: e });
      });
  }

  /**
   * read a person record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof PersonController
   */
  static async read(req, res, next) {
    log('read' + req.query);
    const { cpf } = req.query;
    await db
      .readPerson(cpf)
      .then((person) => {
        return res.status(200).json(person);
      })
      .catch((e) => {
        log(e);
        return res.status(500).json({ message: 'Internal Error!' });
      });
  }

  /**
   * update a person record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof PersonController
   */
  static async update(req, res, next) {
    log('update' + req.body);
    const person = new Person(req.body);

    if (
      person.cpf == undefined ||
      person.name == undefined ||
      person.email == undefined ||
      person.telephone == undefined
    ) {
      return res.status(400).json({ message: 'Bad request!' });
    }

    await db
      .updatePerson(person)
      .then((person) => {
        log(person);
        return res.status(200).json(person);
      })
      .catch((e) => {
        log(e);
        return res.status(500).json({ message: 'Internal Server Error!' });
      });
  }

  /**
   * delete a person record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof PersonController
   */
  static async delete(req, res, next) {
    log('delete ' + req.body);
    const person = req.body;

    if (person == undefined) {
      return res.status(400).json({ message: 'Bad request!' });
    }

    await db
      .deletePerson(person.cpf)
      .then((person) => {
        log(person);
        return res.status(200).json(person);
      })
      .catch((e) => {
        log(e);
        return res.status(500).json({ message: 'Internal Error!' });
      });
  }

  /**
   * get all people records
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof PersonController
   */
  static async getPeople(req, res, next) {
    log('getPeople');

    await db
      .getPeople()
      .then((people) => {
        log({ people });
        return res.status(200).json({ data: people });
      })
      .catch((e) => {
        log(e);
        return res.status(500).json({ message: 'Internal Error!' });
      });
  }
}

export default PersonController;
