var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

var DigestSchema = new Schema({
    type : String,
    receipts: [Schema.ObjectId],
    transactions : [{
        to : String,
        from : String,
        amount : Number
    }],
    createdTimestamp : Number,
    modifiedTimestamp : Number,
    removedTimestamp : Number,
    status : String
});


mongoose.model('Digest', DigestSchema);