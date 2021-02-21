'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _neo4jApi = require('../database/neo4jApi');

var _neo4jApi2 = _interopRequireDefault(_neo4jApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var welcomeRoute = (0, _express.Router)();

welcomeRoute.get('/', function (req, res) {
  return res.status(200).json({
    success: true,
    message: 'This works!'
  });
});

exports.default = welcomeRoute;