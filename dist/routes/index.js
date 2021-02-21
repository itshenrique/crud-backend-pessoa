'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _welcome = require('./welcome.route');

var _welcome2 = _interopRequireDefault(_welcome);

var _person = require('./person.route');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express.Router)();

routes.use('/', _welcome2.default);
routes.use('/', _person2.default);

exports.default = routes;