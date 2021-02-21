'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _neo4jApi = require('../database/neo4jApi');

var _neo4jApi2 = _interopRequireDefault(_neo4jApi);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _person = require('../database/models/person.model');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 *
 * @class PersonController
 */
var PersonController = function () {
  function PersonController() {
    _classCallCheck(this, PersonController);
  }

  _createClass(PersonController, null, [{
    key: 'create',

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
    value: async function create(req, res, next) {
      (0, _fancyLog2.default)('create' + req.body);
      var person = new _person2.default(req.body);

      if (person.cpf == undefined || person.name == undefined || person.email == undefined || person.telephone == undefined) {
        return res.status(400).json({ message: 'Bad request!' });
      }

      await _neo4jApi2.default.createPerson(person).then(function (person) {
        return res.status(200).json(person);
      }).catch(function (e) {
        (0, _fancyLog2.default)(e);
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

  }, {
    key: 'read',
    value: async function read(req, res, next) {
      (0, _fancyLog2.default)('read' + req.query);
      var cpf = req.query.cpf;

      await _neo4jApi2.default.readPerson(cpf).then(function (person) {
        return res.status(200).json(person);
      }).catch(function (e) {
        (0, _fancyLog2.default)(e);
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

  }, {
    key: 'update',
    value: async function update(req, res, next) {
      (0, _fancyLog2.default)('update' + req.body);
      var person = new _person2.default(req.body);

      if (person.cpf == undefined || person.name == undefined || person.email == undefined || person.telephone == undefined) {
        return res.status(400).json({ message: 'Bad request!' });
      }

      await _neo4jApi2.default.updatePerson(person).then(function (person) {
        (0, _fancyLog2.default)(person);
        return res.status(200).json(person);
      }).catch(function (e) {
        (0, _fancyLog2.default)(e);
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

  }, {
    key: 'delete',
    value: async function _delete(req, res, next) {
      (0, _fancyLog2.default)('delete ' + req.body);
      var person = req.body;

      if (person == undefined) {
        return res.status(400).json({ message: 'Bad request!' });
      }

      await _neo4jApi2.default.deletePerson(person.cpf).then(function (person) {
        (0, _fancyLog2.default)(person);
        return res.status(200).json(person);
      }).catch(function (e) {
        (0, _fancyLog2.default)(e);
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

  }, {
    key: 'getPeople',
    value: async function getPeople(req, res, next) {
      (0, _fancyLog2.default)('getPeople');

      await _neo4jApi2.default.getPeople().then(function (people) {
        (0, _fancyLog2.default)({ people: people });
        return res.status(200).json({ data: people });
      }).catch(function (e) {
        (0, _fancyLog2.default)(e);
        return res.status(500).json({ message: 'Internal Error!' });
      });
    }
  }]);

  return PersonController;
}();

exports.default = PersonController;