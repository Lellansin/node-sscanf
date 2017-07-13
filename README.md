# node-sscanf [![NPM Version](https://badge.fury.io/js/sscanf.svg)](http://badge.fury.io/js/sscanf) [![Build Status](https://travis-ci.org/Lellansin/node-sscanf.png?branch=master)](https://travis-ci.org/Lellansin/node-sscanf)

C like sscanf for Node.js.

## Format support now

* `%d` - integer
* `%f` - float
* `%s` - string
* `%S` - string of line
* `%x` - hex
* `%o` - octal


## Return

### Directly return

```javascript
var sscanf = require('sscanf');

var number = sscanf('a=2015', 'a=%d');

console.log(number); // 2015
```

### Array return

```javascript
var scanf = require('scanf');

var result = scanf('Alan 24 180', '%s%d%d');

console.log(result); // [ 'Alan', 24, 180 ]
```

### Json return

```javascript
var scanf = require('scanf');

var result = scanf(
  '12 3.1415926 hello 1F 10',
  '%d %f %s %x %o',
  'integer', 'float', 'string', 'hex', 'octal');

console.log(result);
/*  
{ 
  integer: 12,
  float: 3.1415926,
  string: 'hello',
  hex: 31,
  octal: 8 
}
*/
```

# License

  MIT
