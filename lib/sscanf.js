'use strict';

const Format = require('./format');

module.exports = function (input, formats) {
  let format = new Format(input);
  let re = new RegExp('[^%]*%[A-Za-z][^%]*', 'g');
  let selectors = formats.match(re);

  let result, len = selectors.length;
  let jsonFlag = false, count = 0;

  let deal = dealType.bind(null, format);
  let keys = Array.prototype.slice.call(arguments, 2);

  if (keys.length > 0) {
    result = {};
    jsonFlag = true;
  } else if (len > 1) {
    result = [];
  } else {
    return deal(selectors[0]);
  }

  selectors.map((val) => {
    if (jsonFlag) {
      result[keys.shift() || count++] = deal(val);
    } else {
      result.push(deal(val));
    }
  });

  return result;
};

function dealType(format, selector) {
  let ret;
  let res = selector.match(/%[A-Za-z]+/);
  let res2 = selector.match(/[^%]*/);
  if (!res) {
    return null;
  }

  let type = res[0];
  let pre = !!res2 ? res2[0] : null;
  let next = selector.substr(selector.indexOf(type) + type.length);

  switch (type) {
    case '%d':
    case '%ld':
    case '%llu':
    case '%lu':
    case '%u':
      ret = format.getInteger(pre, next);
      break;
    case '%c': // TODO getChar
    case '%s':
      ret = format.getString(pre, next);
      break;
    case '%S':
      ret = format.getLine(pre, next);
      break;
    case '%X':
    case '%x':
      ret = format.getHex(pre, next);
      break;
    case '%O':
    case '%o':
      ret = format.getOctal(pre, next);
      break;
    case '%f':
      ret = format.getFloat(pre, next);
      break;

    default:
      throw new Error('Unknown type "' + type + '"');
  }
  return ret;
}
