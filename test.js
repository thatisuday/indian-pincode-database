// load modules
const
	mongoose 				= 	require('mongoose'),
	expect 					= 	require('chai').expect,
	_ 						= 	require('lodash'),
	indianPincodeDatabase 	= 	require('./')
;

var pincodesCount = 0;

describe('Main', function(){
	before(function(done){
		indianPincodeDatabase.pushToDatabase('pincodeDb', 'pincodes', done);
	});

	before(function(done){
		require('./res/csv-to-json')(function(data){
			pincodesCount = data.length;
			done();
		})
	});

	it('should match documents count in database', function(done){
		// Import mongoose pincode model
		var Pincode = mongoose.model('Pincode');

		Pincode.count({}, function(err, count){
			if(err) done(err);

			expect(count).to.equal(pincodesCount);
			done();
		});
	});
});



