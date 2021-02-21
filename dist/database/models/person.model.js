"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(properties) {
  _classCallCheck(this, Person);

  this.cpf = properties.cpf;
  this.name = properties.name;
  this.email = properties.email;
  this.telephone = properties.telephone;
};

exports.default = Person;