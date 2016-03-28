var mainFiles = require('./index');

var result = mainFiles('**/*.js');
var resultAll = mainFiles('**/*.js', { onlySpecified: false });

console.log(result);
// console.log(resultAll);
