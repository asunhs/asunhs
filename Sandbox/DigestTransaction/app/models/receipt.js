var mongoose = require('mongoose');

module.exports = mongoose.model('Receipt', {
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