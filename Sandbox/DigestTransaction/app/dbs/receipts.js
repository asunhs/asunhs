var mongoose = require('mongoose');
var Receipt = mongoose.model('Receipt');
var _ = require('underscore');
var async = require('async');



module.exports.find = function (conditions, cb) {
    return Receipt.find(function (err, receipts) {
        if (!!err) {
            return cb(err, null);
        }
        
        return cb(null, receipts);
    });
};


module.exports.save = function (receipts, callback) {
    
    
    var results = [];
    
    async.each(receipts, function (receipt, cb) {
        new Receipt(receipt).save(function (err) {
            if (!!err) {
                return cb(err);
            }

            results.push(receipt);
            return cb();
        });
    }, function (err) {
        callback(err, results);
    });
    
};