# Indian Pincode Database
Database of Indian pin (postal) codes for node applications. More than 1,54,820 entries.

***

## Automatically populate local mongodb

You can push all pincodes to mongodb database running on local instance

```
const indianPincodeDatabase = require('indian-pincode-database');
indianPincodeDatabase.pushToDatabase(databaseName, collectionName, callback); // all args are optional
```

> **WARNING** : pushToDatabase first removes the collection (if exists) before populating the database.

Data model will look like below

```
{
	"_id"            : ObjectId("57cf31cdd18a0062f4cbd624"),
    "updatedAt"      : ISODate("2016-09-06T21:14:53.993Z"),
    "createdAt"      : ISODate("2016-09-06T21:14:53.993Z"),
    "officeName"     : "Dhannoor B.O",
    "pincode"        : 504304,
    "officeType"     : "B.O",
    "deliveryStatus" : "Delivery",
    "divisionName"   : "Adilabad",
    "regionName"     : "Hyderabad",
    "circleName"     : "Andhra Pradesh",
    "taluk"          : "Boath",
    "districtName"   : "Adilabad",
    "stateName"      : "ANDHRA PRADESH",
    "__v" : 0
}
```

***

## Querying

Once you have the database, you can perform search the way you want using mongodb native module or mongojs. But if you wish to use mongoose, then you must need a `schema` which you can import like

```
const indianPincodeDatabase = require('indian-pincode-database');
var pincodeDocSchema = indianPincodeDatabase.pincodeDocSchema;
pincodeDocSchema.set('collection', 'my_pincodes_collection');

// create model to query
var myPincode = mongoose.model('myPincode', pincodeDocSchema);
myPincode.find({}, callback);
```

> Do not populate pincodes database (using `pushToDatabase` method) in your api code unless needed. While population, this module creates new db connection using mongoose. This may lead to db connection collision. Better, you first populate the db by simple execution `node populate.js` and then create custom model as above.
