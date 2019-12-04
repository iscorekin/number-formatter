'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var sscs = {
  toFixed: function toFixed(fix) {
    if (!this.__hasError) {
      this.__value = parseFloat(this.__value.toFixed(fix));
    }

    return this;
  },
  toFirstNumberFixed: function toFirstNumberFixed() {
    if (!this.__hasError) {
      var fill = function fill(n) {
        var zeros = '';
        for (var i = 0; i < n; i++) {
          zeros += '0';
        }
        return zeros;
      };

      var str = this.__value.toString().split('.')[1] || this.__value.toString().split(',')[1];

      if (!str) return this;

      var firstNumIndex = [].concat(_toConsumableArray(str)).findIndex(function (x) {
        return parseInt(x) > 0;
      });
      var rounded = [].concat(_toConsumableArray(str)).slice(firstNumIndex)[0];
      this.__value = '0.' + fill(firstNumIndex) + rounded;
    }

    return this;
  },
  round: function round() {
    if (!this.__hasError) this.__value = Math.round(this.__value);

    return this;
  },
  separate: function separate() {
    if (!this.__hasError) this.__value = this.__value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return this;
  },
  replaceDots: function replaceDots() {
    if (!this.__hasError) this.__value = this.__value.toString().replace('.', ',');

    return this;
  },
  valueOf: function valueOf() {
    return !this.__hasError ? this.__value : this.__config.error;
  }
};

exports.default = function (value, config) {
  var hasError = !value || isNaN(value) || value === Number.MIN_VALUE;

  var conf = _extends({
    error: '-'
  }, config);

  return _extends({
    __hasError: hasError,
    __value: !hasError ? value : conf.error,
    __config: config
  }, sscs);
};