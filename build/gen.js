/**
 * Created by likaituan on 07/07/2017.
 */


var fs = require('fs');
var {getArgs} = require('ifun');
var config = require('../../config/node');

var args = getArgs();
var url = config[args.node];

var code = fs.readFileSync(`${__dirname}/analyze.js`).toString().replace(/var serverPath = '';/, `var serverPath = '${url}';`);
fs.writeFileSync(`dist/${args.output}`, code);
console.log(`success create file [dist/${args.output}]`);

// 根目录 node src/analyze/genAnalyze node=pro output=analyze-ie.js