var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

var ReceiptSchema = new Schema({
    type : String,
    to : String,
    title : String,
    transactions : [{
        from : String,
        amount : Number
    }],
    createdTimestamp : Number,
    modifiedTimestamp : Number,
    removedTimestamp : Number,
    digestId : Schema.ObjectId,
    status : String
});


mongoose.model('Receipt', ReceiptSchema);