'use strict';

const utils = require('./utils');

function Format (str) {
  this.input = str;
}

Format.prototype.getInteger = function(pre, next) {
  let text = getInput(this, pre, next, '[-]?[A-Za-z0-9]+');
  if (!text) {
    return null;
  } else if (text[0] == '0') {
    if (text[1] == 'x' || text[1] == 'X') {
      return utils.hex2int(text);
    } else {
      return utils.octal2int(text);
    }
  } else {
    return parseInt(text);
  }
};

Format.prototype.getFloat = function(pre, next) {
  let text = getInput(this, pre, next, '[-]?[0-9]+[\.]?[0-9]*');
  return parseFloat(text);
};

Format.prototype.getHex = function(pre, next) {
  let text = getInput(this, pre, next, '[A-Za-z0-9]+');
  return utils.hex2int(text);
};

Format.prototype.getOctal = function(pre, next) {
  let text = getInput(this, pre, next, '[A-Za-z0-9]+');
  return utils.octal2int(text);
};

Format.prototype.getString = function(pre, next) {
  let text = getInput(this, pre, next, '([\\w\\]=-]|\\S[^\\][^\\ ])+(\\\\[\\w\\ ][\\w\\:]*)*', 'STR');
  if (/\\/.test(text))
    text = utils.stripslashes(text);
  return text;
};

Format.prototype.getLine = function(pre, next) {
  let text = getInput(this, pre, next, '[^\n\r]*');
  if (/\\/.test(text))
    text = utils.stripslashes(text);
  return text;
};

const getInput = function(self, pre, next, match, type) {
  let result, input = self.input;
  if (!input.length || input === '\r') {
    return null;
  }

  // console.log('intput [%s] \npre [%s] \nnext [%s] \nmatch [%s]\n\n', self.input, pre, next, match);

  // match format
  let replace = '(' + match + ')';
  let tmp = input;

  // while scan string, replace before and after
  if (type === 'STR' && next.trim().length > 0) {
    let before_macth = utils.regslashes(pre);
    let after_match = utils.regslashes(next) + '[\\w\\W]*';
    if (before_macth.length) {
      tmp = tmp.replace(new RegExp(before_macth), '');
    }
    tmp = tmp.replace(new RegExp(after_match), '');
  } else {
    replace = utils.regslashes(pre) + replace;
  }

  let m = tmp.match(new RegExp(replace));

  if (!m) {
    self.input = input.replace(utils.regslashes(pre) + utils.regslashes(next), '');
    return null;
  }
  result = m[1];

  // strip match content
  self.input = input
    .substr(input.indexOf(result))
    .replace(result, '')
    .replace(next, '');

  return result;
};

module.exports = Format;
