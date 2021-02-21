'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _person = require('../controllers/person.controller');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.post('/person', _person2.default.create);
router.get('/person', _person2.default.read);
router.put('/person', _person2.default.update);
router.get('/getPeople', _person2.default.getPeople);
router.post('/deletePerson', _person2.default.delete);

exports.default = router;