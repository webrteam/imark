/**
 * Created by likaituan on 30/08/2017.
 */
var {cmd} = require('ifun');

var targetFile = 'imark.min.js';

cmd(`babel imark.js -o ${targetFile}`);
cmd(`uglifyjs ${targetFile} -o ${targetFile}`);

console.log(`build ${targetFile} success!`);