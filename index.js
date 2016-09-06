// load modules
const mongoose 		= 	require('mongoose');
const _ 			= 	require('lodash');
const async 		= 	require('async');
const progressBar 	= 	require('progress');

// export pincode doc schema
exports.pincodeDocSchema = require('./pincodeDocSchema');

// export function to push database in mongodb database
exports.pushToDatabase = function(database, collection, callback, options){
	
	// default storage
	database 	= (database) 	? database 		: 'indian_pincodes';
	collection 	= (collection) 	? collection 	: 'pincodes';

	// connect to local instance
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://127.0.0.1/' + database);
	
	// catach error
	mongoose.connection.on('error', function(){
		return console.log('failed to connect mongodb database on local machine.');
	});

	// start pushing
	mongoose.connection.on('open', function(){
		
		// require pincodeDocSchema and set collection
		var pincodeDocSchema = exports.pincodeDocSchema;
		pincodeDocSchema.set('collection', collection);

		// create model
		var Pincode = mongoose.model('Pincode', pincodeDocSchema);

		// drop old collection
		// run loop on pincode array
		mongoose.connection.db.dropCollection(collection, function(err, result){
			
			// get array list of pin codes
			require('./res/csv-to-json')(function(docs){

				// create new progress bar
				var bar = new progressBar('populating [:bar] :percent :etas', {
					total : docs.length,
					clear : true
				});

				// save each pincode array in database
				async.eachSeries(docs, function(doc, cb){
					var pincodeMongoDoc = new Pincode(doc);

					pincodeMongoDoc.save(function(err){
						if(err){
							cb(err);
						}
						else{
							if(_.get(options, 'showOutput') != false){
								bar.tick();
							}
							
							cb(null);
						}
					});
				}, function(err){
					if(_.get(options, 'showOutput') != false){
						if(err){
							console.log('Some error occured while saving the document! ' + err);
						}
						else{
							console.log('Done! Populated in : ' + database + ' -> ' + collection)
						}
					}
					
					// call callback
					(callback) ? callback() : _.noop();
				});
			});

		});

	});
}