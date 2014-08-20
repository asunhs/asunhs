var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

var ReceiptSchema = new Schema({
    to : String,
    title : String,
    transactions : [{
        from : String,
        amount : Number
    }],
    createdTimestamp : Number,
    modifiedTimestamp : Number,
    removedTimestamp : Number,
    status : String
});


mongoose.model('Receipt', ReceiptSchema);