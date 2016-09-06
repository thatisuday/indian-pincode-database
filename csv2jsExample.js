var csv2js = require('./res/csv-to-json');
csv2js(function(data){
	console.log(data[0]);
});