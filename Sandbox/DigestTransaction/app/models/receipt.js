var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

var ReceiptSchema = new Schema({
    type : String,
    owner : String,
    title : String,
    receipts: [Schema.ObjectId],
    transactions : [{
        from : String,
        to : String,
        amount : Number
    }],
    createdTimestamp : Number,
    modifiedTimestamp : Number,
    removedTimestamp : Number,
    digestId : Schema.ObjectId,
    status : String
});


mongoose.model('Receipt', ReceiptSchema);