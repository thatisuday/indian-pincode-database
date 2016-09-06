// load modules
const mongoose 		= 	require('mongoose');
const _ 			= 	require('lodash');
const async 		= 	require('async');
const progressBar 	= 	require('progress');

// create pincode document schema
var docSchema = new mongoose.Schema({
	officeName: {
		type : String,
		trim : true
	},
	pincode: {
		type 	: Number,
		trim 	: true,
		index	: true,
		set 	: function(v){
			return _.toNumber(v);
		}
	},
	officeType: {
		type : String,
		trim : true
	},
	deliveryStatus: {
		type : String,
		trim : true
	},
	divisionName: {
		type : String,
		trim : true
	},
	regionName: {
		type : String,
		trim : true
	},
	circleName: {
		type : String,
		trim : true
	},
	taluk: {
		type : String,
		trim : true
	},
	districtName: {
		type : String,
		trim : true
	},
	stateName: {
		type : String,
		trim : true
	}
}, 
{
	timestamps 	: 	true,
	toObject 	: 	{virtuals : true, getters:true},
	toJSON 		: 	{virtuals : true, getters:true}
});

// export schema
module.exports = exports = docSchema;