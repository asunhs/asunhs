var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

var ReceiptSchema = new Schema({
    to : String,
    receiptId : Number,
    title : String,
    transactions : [{
        from : String,
        amount : Number
    }],
    createdTimestamp : Number,
    status : String
});


mongoose.model('Receipt', ReceiptSchema);