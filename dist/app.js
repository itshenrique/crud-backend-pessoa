'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _neo4jApi = require('./database/neo4jApi');

var _neo4jApi2 = _interopRequireDefault(_neo4jApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function init the database
_neo4jApi2.default.init();

var app = (0, _express2.default)();

app.use((0, _cors2.default)());

app.use(_bodyParser2.default.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(_bodyParser2.default.json());

app.use(_routes2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Resource does not exist');
  err.status = 404;
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  return res.status(err.status || 500).json({
    error: {
      message: err.message,
      error: {}
    },
    status: false
  });
});

// configure port and listen for requests
var port = 3000;

var server = exports.server = app.listen(port, function () {
  (0, _fancyLog2.default)('Server is running on http://localhost:' + port + ' ');
});

exports.default = app;