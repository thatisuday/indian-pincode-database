// modules
var fs = require("fs");

//Converter Class
var Converter = require("csvtojson").Converter;

// csv file
var csv = __dirname + '/all_india_pin_code.csv';

/********************************************************************/

module.exports = exports = function(callback){
	var converter = new Converter();
	fs.createReadStream(csv).pipe(converter);

	converter.on("end_parsed", function (jsArray){
		callback(jsArray);
	});
};